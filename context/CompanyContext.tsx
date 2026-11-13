import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { get } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { useLocalization } from "./LocalizationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { ApiRecord, CompanyContextValue } from "./types";

const CompanyContext = createContext<CompanyContextValue | null>(null);

export const useCompany = () => {
  return useContext(CompanyContext) as CompanyContextValue;
};

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  // 1. Počinjemo sa null jer se podaci učitavaju asinhrono sekundu kasnije
  const [company, setCompany] = useState<ApiRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { localization } = useLocalization();

  // 2. Učitavamo podatke iz skladišta čim se komponenta pokrene
  useEffect(() => {
    const loadStoredCompany = async () => {
      try {
        const savedCompany = await AsyncStorage.getItem("company_data");
        if (savedCompany) {
          setCompany(JSON.parse(savedCompany));
        }
      } catch (err) {
        console.error("Greška pri čitanju iz AsyncStorage:", err);
      }
    };

    loadStoredCompany();
  }, []);

  const getCompany = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await get(endpoints.company);

      setCompany(response);
      // Koristimo await za čuvanje podataka
      await AsyncStorage.setItem("company_data", JSON.stringify(response));
      setIsLoading(false);
    } catch {
      setError(localization.COMPANY.error);
      setIsLoading(false);
    }
  };

  return (
    <CompanyContext.Provider value={{ company, getCompany, isLoading, error }}>
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyContext;