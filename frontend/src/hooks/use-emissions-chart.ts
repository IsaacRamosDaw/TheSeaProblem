import { useEffect, useState, useMemo } from "react";
import { Emission, Company, PollutionType } from "@/shared/types/db-models";
import { COLORS, DEFAULT_COLOR } from "../constants/chart-colors";
import { getAllEmissions } from "../services/emissions";
import { getAllCompanies } from "../services/companys";

export const useEmissionsChart = () => {
  const [allData, setAllData] = useState<Emission[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null,
  );
  const [visibleTypes, setVisibleTypes] = useState<Set<string>>(new Set());
  const [pollutionTypes, setPollutionTypes] = useState<string[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [emissions, companies] = await Promise.all([
          getAllEmissions(),
          getAllCompanies(),
        ]);

        setAllData(emissions);
        setCompanies(companies);
        setSelectedCompanyId(companies[0]?.id || null);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedCompanyId) return;

    const filtered = allData.filter((e) => e.companyId === selectedCompanyId);
    const types: PollutionType[] = [
      ...new Set(filtered.map((e) => e.pollutionType)),
    ];

    setPollutionTypes(types);
    setVisibleTypes(new Set(types));

    const dates = [...new Set(filtered.map((e) => e.date.split("T")[0]))].sort(
      (a, b) => a.localeCompare(b),
    );

    setLabels(dates);
  }, [selectedCompanyId, allData]);

  const handleCheckboxChange = (type: string) => {
    setVisibleTypes((prev) => {
      const updated = new Set(prev);
      updated.has(type) ? updated.delete(type) : updated.add(type);
      return updated;
    });
  };

  const handleCompanyChange = (companyId: number) => {
    setSelectedCompanyId(companyId);
  };

  const datasets = useMemo(() => {
    if (!selectedCompanyId) return [];

    const dataForCompany = allData.filter(
      (e) => e.companyId === selectedCompanyId,
    );

    return Array.from(visibleTypes).map((type) => {
      const filtered = dataForCompany.filter((e) => e.pollutionType === type);
      const dataMap = new Map(
        filtered.map((e) => [e.date.split("T")[0], e.volume]),
      );

      return {
        label: type,
        data: labels.map((date) => dataMap.get(date) ?? null),
        fill: false,
        backgroundColor:
          COLORS[type as keyof typeof COLORS]?.bg || DEFAULT_COLOR.bg,
        borderColor:
          COLORS[type as keyof typeof COLORS]?.border || DEFAULT_COLOR.border,
      };
    });
  }, [selectedCompanyId, allData, visibleTypes, labels]);

  return {
    companies,
    selectedCompanyId,
    pollutionTypes,
    visibleTypes,
    labels,
    datasets,
    handleCompanyChange,
    handleCheckboxChange,
  };
};
