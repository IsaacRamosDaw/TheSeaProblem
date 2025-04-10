import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { OilSpillFeature } from '../../../../shared/types/oil-spill';

// Ícono personalizado
const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

interface MapComponentProps {
  features: OilSpillFeature[];
}

const MapComponent: React.FC<MapComponentProps> = ({ features }) => {
  // Filtrar solo los features válidos que tienen geometry y coordinates correctos
  const validFeatures = features.filter(feature => {
    const isValid = feature.geometry?.coordinates && 
                   feature.geometry.coordinates.length === 2 &&
                   !isNaN(feature.geometry.coordinates[0]) &&
                   !isNaN(feature.geometry.coordinates[1]);
    
    return isValid;
  });


  // Calcular un centro por defecto basado en el promedio de las coordenadas
  const defaultCenter: [number, number] = validFeatures.length > 0 
    ? validFeatures.reduce((acc, feature) => {
        return [
          acc[0] + feature.geometry.coordinates[1],
          acc[1] + feature.geometry.coordinates[0]
        ];
      }, [0, 0]).map((sum: number) => sum / validFeatures.length) as [number, number]
    : [0, 0];


  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={2} 
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {validFeatures.map(feature => {
        const position: [number, number] = [
          feature.geometry.coordinates[1], // latitud
          feature.geometry.coordinates[0]  // longitud
        ];
        return (
          <Marker 
            key={feature.id} 
            position={position}
            icon={markerIcon}
          >
            <Popup>
              <strong>ID:</strong> {feature.id}<br />
              <strong>Coordenadas:</strong> {position[0].toFixed(4)}, {position[1].toFixed(4)}<br />
              <strong>Área (km²):</strong> {(feature.area / 1_000_000).toFixed(2)}<br />
              <strong>Confianza:</strong> {(feature.machine_confidence * 100).toFixed(0)}%
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
