import { createContext, useContext, useEffect, useState } from "react";
import { get } from "@/api/apiService";
import { useLocalization } from "./LocalizationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CompanyContext = createContext(null);

export const useCompany = () => {
  return useContext(CompanyContext);
};

export const CompanyProvider = ({ children }) => {
  // 1. Počinjemo sa null jer se podaci učitavaju asinhrono sekundu kasnije
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
      const response = await get("/company");

      setCompany(response);
      // Koristimo await za čuvanje podataka
      await AsyncStorage.setItem("company_data", JSON.stringify(response));
      setIsLoading(false);
    } catch (err) {
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