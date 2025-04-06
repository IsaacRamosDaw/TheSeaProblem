import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import MapComponent from '../map/MapComponent';
import * as wellknown from 'wellknown';
import { OilSpillFeature } from '@shared/types/oil-spill';
import './CeruleanPollutionDashboard.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API_BASE = "/api";
const COLLECTION_ID = "public.slick"; // Verificar nombre exacto en /collections

const CeruleanPollutionDashboard = () => {
  const [data, setData] = useState<OilSpillFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(Date.now() - 24 * 3600 * 1000), // Ayer
    new Date()
  ]);
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [groupDistance, setGroupDistance] = useState<number>(0.1); // Distancia en grados para agrupar

  // Función para calcular la distancia entre dos puntos en grados
  const calculateDistance = (coord1: [number, number], coord2: [number, number]) => {
    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;
    return Math.sqrt(Math.pow(lon2 - lon1, 2) + Math.pow(lat2 - lat1, 2));
  };

  // Función para encontrar el grupo al que pertenece una coordenada
  const findGroup = (coord: [number, number], groups: [number, number][][]) => {
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      // Si alguna coordenada del grupo está cerca de la coordenada actual
      if (group.some(groupCoord => calculateDistance(groupCoord, coord) <= groupDistance)) {
        return i;
      }
    }
    return -1;
  };

  // Función para obtener ubicaciones agrupadas
  const getGroupedLocations = (features: OilSpillFeature[]) => {
    const groups: [number, number][][] = [];
    const featureGroups: Map<string, number> = new Map();
    
    // Agrupar coordenadas
    features.forEach(feature => {
      const coord = feature.geometry.coordinates as [number, number];
      const groupIndex = findGroup(coord, groups);
      
      if (groupIndex === -1) {
        // Crear nuevo grupo
        groups.push([coord]);
        featureGroups.set(`${coord[0]},${coord[1]}`, groups.length - 1);
      } else {
        // Agregar al grupo existente
        groups[groupIndex].push(coord);
        featureGroups.set(`${coord[0]},${coord[1]}`, groupIndex);
      }
    });

    // Calcular centroide de cada grupo
    const centroids = groups.map(group => {
      const sum = group.reduce((acc, coord) => [acc[0] + coord[0], acc[1] + coord[1]], [0, 0]);
      return [sum[0] / group.length, sum[1] / group.length] as [number, number];
    });

    // Contar features por grupo
    const groupCounts = new Array(groups.length).fill(0);
    featureGroups.forEach(groupIndex => {
      groupCounts[groupIndex]++;
    });

    return {
      groups,
      centroids,
      groupCounts,
      featureGroups
    };
  };

  // Obtener ubicaciones agrupadas
  const { groups, centroids, groupCounts, featureGroups } = getGroupedLocations(data);

  // Filtrar datos por ubicación seleccionada
  const filteredData = selectedLocation === 'all' 
    ? data 
    : data.filter(feature => {
        const coord = feature.geometry.coordinates as [number, number];
        const key = `${coord[0]},${coord[1]}`;
        const groupIndex = featureGroups.get(key);
        return groupIndex !== undefined && centroids[groupIndex].join(',') === selectedLocation;
      });

  // Preparar opciones para el selector de ubicaciones
  const locationOptions = [
    { id: 'all', label: 'All contaminated areas' },
    ...centroids.map((centroid, index) => ({
      id: centroid.join(','),
      label: `Area ${index + 1} (${centroid[0].toFixed(4)}, ${centroid[1].toFixed(4)}) - ${groupCounts[index]} detections`
    }))
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/collections/${COLLECTION_ID}/items`,
          {
            params: {
              datetime: `${dateRange[0].toISOString()}/${dateRange[1].toISOString()}`,
              limit: 100
            }
          }
        );

        const features = response.data?.features || response.data || [];

        const transformedFeatures = features.map((feature: any) => {
          try {
            const geojson = wellknown.parse(feature.geometry);
            let coords: [number, number] = [0, 0];

            if (!geojson) {
              console.error('Error: Invalid geometry format');
              return null;
            }

            if (geojson.type === 'Point' && 'coordinates' in geojson) {
              coords = geojson.coordinates as [number, number];
            } else if (geojson.type === 'Polygon' && 'coordinates' in geojson) {
              coords = (geojson.coordinates[0][0] as [number, number]);
            } else if (geojson.type === 'MultiPolygon' && 'coordinates' in geojson) {
              coords = (geojson.coordinates[0][0][0] as [number, number]);
            } else {
              console.error('Error: Unsupported geometry type:', geojson.type);
              return null;
            }

            const confidence = feature.properties?.confidence || 
                             feature.confidence || 
                             feature.machine_confidence || 
                             feature.properties?.machine_confidence || 0;

            // Mostrar la estructura completa del feature

            return {
              id: feature.id || Math.random().toString(),
              geometry: {
                type: "Point",
                coordinates: coords
              },
              slick_timestamp: feature.properties?.datetime || feature.datetime || new Date().toISOString(),
              area: feature.properties?.area_m2 || feature.area || 0,
              machine_confidence: confidence
            };
          } catch (error) {
            console.error('Error processing feature:', error);
            return null;
          }
        }).filter(Boolean);

        setData(transformedFeatures);
      } catch (err) {
        console.error('Error in fetchData:', err);
        const error = err as AxiosError;
        const errorMessage =
          error.response?.data && typeof error.response.data === 'object'
            ? (error.response.data as { detail?: string }).detail
            : 'Error loading data';
        setError(errorMessage || 'Error loading data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      setDateRange([date, new Date()]);
    }
  };

  // Transformar datos para gráficos
  const chartData = {
    labels: filteredData.map(f => `ID: ${f.id}`),
    datasets: [
      {
        label: 'Contaminated Area (km²)',
        data: filteredData.map(f => {
          const areaKm2 = (f.area / 1_000_000).toFixed(2);
          return parseFloat(areaKm2);
        }),
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y',
        type: 'line' as const,
        // type: 'scatter' as const,
      },
      {
        label: 'Confidence Level (%)',
        data: filteredData.map(f => {
          const confidence = f.machine_confidence;
          return Math.min(Math.max(confidence, 0), 100);
        }),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: '#36a2eb',
        yAxisID: 'y1',
        type: 'bar' as const,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Area (km²)'
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Confidence (%)'
        },
        grid: {
          drawOnChartArea: false,
        },
      }
    }
  };

  if (loading) return <div className="loading">Loading data...</div>;
  if (error) return <div className="error-alert">{error}</div>;

  return (
    <div className="dashboard-container">
      <div className="filters-section">
        <div className="filter-group">
          <label>Initial date</label>
          <input
            type="date"
            value={dateRange[0].toISOString().split('T')[0]}
            onChange={handleDateChange}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="filter-group">
          <label>Contaminated area</label>
          <select
            value={selectedLocation}
            onChange={e => setSelectedLocation(e.target.value)}
          >
            {locationOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="distance-filter">
          <div className="distance-label">
            <span>Grouping distance (degrees)</span>
            <span className="distance-value">{groupDistance.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.01"
            value={groupDistance}
            onChange={e => setGroupDistance(parseFloat(e.target.value))}
          />
          <div className="distance-limits">
            <span>0.1</span>
            <span>1.0</span>
          </div>
        </div>
      </div>

      <div className="data-source-info">
        <h3>Data Source</h3>
        <p>
          The Cerulean API leverages satellite imagery—particularly from sensors like Sentinel-1—to detect oil spills on the ocean's surface. By using machine learning algorithms and advanced radar image processing, the system analyzes large volumes of data to identify anomalies and patterns that are characteristic of oil spills, such as areas with low surface roughness and reflectivity.
        </p>
        <p>
          Each detection is converted into a geospatial feature that includes key information such as:
        </p>
        <ul>
          <li>Geographic coordinates of the spill</li>
          <li>Estimated contaminated area in square meters</li>
          <li>Confidence level of the detection (0-1)</li>
          <li>Unique detection ID</li>
          <li>Detection timestamp</li>
        </ul>
        <p>
          This data enables users to monitor, analyze, and respond promptly to potential oil pollution incidents. The data is updated in real-time as new detections are processed. You can filter the data by date range and group nearby detections using the distance slider.
        </p>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h2>Contaminated Area and Confidence Level</h2>
          <Chart 
            type='bar'
            data={chartData} 
            options={chartOptions}
          />
        </div>

        <div className="map-section">
          <h2>Locations</h2>
          <MapComponent features={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default CeruleanPollutionDashboard;