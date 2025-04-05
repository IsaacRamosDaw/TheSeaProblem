import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Emission {
  id: number;
  pollutionType: string;
  volume: number;
  frequency: string;
  dischargePoint: string;
  reductionTarget: string;
  companyId: number;
  date: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
  }[];
}

const EmissionsChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    axios.get<Emission[]>("/api/emissions")
      .then(response => {
        const data = response.data;
        console.log("Respuesta de la API:", data);
        
        const sortedData = data.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        
        const labels = sortedData.map(item => item.date);
        const volumes = sortedData.map(item => item.volume);

        setChartData({
          labels,
          datasets: [
            {
              label: "Volumen de residuos",
              data: volumes,
              fill: false,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
            },
          ],
        });
      })
      .catch(error => {
        console.error("Error al obtener los datos de emisiones:", error);
      });
  }, []);

  return (
    <div>
      <h2>Reducción del Volumen de Residuos</h2>
      {chartData ? (
        <Line data={chartData} />
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default EmissionsChart;
