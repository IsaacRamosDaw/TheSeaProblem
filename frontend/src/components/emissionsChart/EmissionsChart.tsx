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

interface Company {
  id: number;
  companyName: string;
}

const COLORS: Record<string, { bg: string; border: string }> = {
  Chemical: { bg: "rgba(75,192,192,0.4)", border: "rgba(75,192,192,1)" },
  Plastic: { bg: "rgba(255,99,132,0.4)", border: "rgba(255,99,132,1)" },
  "Oil Spill": { bg: "rgba(255,206,86,0.4)", border: "rgba(255,206,86,1)" },
};

const EmissionsChart: React.FC = () => {
  const [allData, setAllData] = useState<Emission[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [visibleTypes, setVisibleTypes] = useState<Set<string>>(new Set());
  const [pollutionTypes, setPollutionTypes] = useState<string[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  // Fetch companies and emissions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [emissionsRes, companiesRes] = await Promise.all([
          axios.get<Emission[]>("/api/emissions"),
          axios.get<Company[]>("/api/companies"),
        ]);

        setAllData(emissionsRes.data);
        setCompanies(companiesRes.data);
        const defaultCompany = companiesRes.data[0]?.id;
        setSelectedCompanyId(defaultCompany);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  // Update chart info when selected company changes
  useEffect(() => {
    if (!selectedCompanyId) return;

    const filtered = allData.filter((e) => e.companyId === selectedCompanyId);
    const types = Array.from(new Set(filtered.map((e) => e.pollutionType)));
    setPollutionTypes(types);
    setVisibleTypes(new Set(types));

    const dates = Array.from(
      new Set(filtered.map((e) => new Date(e.date).toISOString().slice(0, 10)))
    ).sort();

    setLabels(dates);
  }, [selectedCompanyId, allData]);

  const handleCheckboxChange = (type: string) => {
    setVisibleTypes((prev) => {
      const updated = new Set(prev);
      updated.has(type) ? updated.delete(type) : updated.add(type);
      return updated;
    });
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompanyId(Number(e.target.value));
  };

  const generateDatasets = () => {
    if (!selectedCompanyId) return [];

    const dataForCompany = allData.filter((e) => e.companyId === selectedCompanyId);

    return Array.from(visibleTypes).map((type) => {
      const filtered = dataForCompany.filter((e) => e.pollutionType === type);
      const dataMap = new Map(
        filtered.map((e) => [new Date(e.date).toISOString().slice(0, 10), e.volume])
      );

      const data = labels.map((date) => dataMap.get(date) ?? null);

      return {
        label: type,
        data,
        fill: false,
        backgroundColor: COLORS[type]?.bg || "rgba(100,100,100,0.4)",
        borderColor: COLORS[type]?.border || "rgba(100,100,100,1)",
      };
    });
  };

  const chartData = {
    labels,
    datasets: generateDatasets(),
  };

  return (
    <div>
      <h2>Waste Volume by Company</h2>

      {/* Company Selector */}
      <div style={{ marginBottom: "1rem" }}>
        <label>
          <strong>Select company: </strong>
          <select value={selectedCompanyId ?? ""} onChange={handleCompanyChange}>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.companyName}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Pollution Type Checkboxes */}
      <div style={{ marginBottom: "1rem" }}>
        <strong>Filter by pollution type:</strong>
        {pollutionTypes.map((type) => (
          <label key={type} style={{ marginRight: "1rem" }}>
            <input
              type="checkbox"
              checked={visibleTypes.has(type)}
              onChange={() => handleCheckboxChange(type)}
            />
            {type}
          </label>
        ))}
      </div>

      {/* Chart */}
      {labels.length && chartData.datasets.length ? (
        <Line data={chartData} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default EmissionsChart;
