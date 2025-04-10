import React from "react";
import { COLORS, DEFAULT_COLOR } from "../../constants/chart-colors";
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
import { useEmissionsChart } from "../../hooks/use-emissions-chart";
import styles from "./EmissionsChart.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const EmissionsChart: React.FC = () => {
  const {
    companies,
    selectedCompanyId,
    pollutionTypes,
    visibleTypes,
    labels,
    datasets,
    handleCompanyChange,
    handleCheckboxChange,
  } = useEmissionsChart();

  const chartData = {
    labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: COLORS[dataset.label as keyof typeof COLORS]?.bg || DEFAULT_COLOR.bg,
      borderColor: COLORS[dataset.label as keyof typeof COLORS]?.border || DEFAULT_COLOR.border,
      spanGaps: true,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Waste Volume by Company</h2>

      <div className={styles.controlGroup}>
        <label className={styles.label}>
          <strong>Select company: </strong>
          <select
            className={styles.select}
            value={selectedCompanyId ?? ""}
            onChange={(e) => handleCompanyChange(Number(e.target.value))}
          >
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.companyName}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.controlGroup}>
        <strong className={styles.label}>Filter by pollution type:</strong>
        <div className={styles.checkboxGroup}>
          {pollutionTypes.map((type) => (
            <label key={type} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={visibleTypes.has(type)}
                onChange={() => handleCheckboxChange(type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.chartWrapper}>
        {labels.length > 0 && datasets.length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <p className={styles.noData}>No data available</p>
        )}
      </div>
    </div>
  );
};

export default EmissionsChart;
