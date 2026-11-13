import { createContext, useContext, useEffect, useState } from "react";
import { ENG_LOCALIZATION } from "../helpers/en-locale";
import { SRB_LOCALIZATION } from "../helpers/srb-locale";
import { getLanguageValue, setLanguageValue } from "../helpers/language";
import { put } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { getStorage } from "@/helpers/token";

const LocalizationContext = createContext(/** @type {any} TODO(phase4): real type */ (null));

export const useLocalization = () => useContext(LocalizationContext);

export const LocalizationProvider = ({ children }) => {
  const [localization, setLocalization] = useState(null); // ⚠️ null initially
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const changeFirebaseLocalization = async (lang) => {
    setIsLoading(true);

    const langData = lang === "en" ? "en" : "sr";
    try {
      const token = await getStorage();
      if (!token) return;
      await put(endpoints.users.changeLanguage(token), { langData });
    } catch (error) {
      console.log("LocalizationContext error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeLocalization = (language) => {
    const { code } = language;
    changeFirebaseLocalization(code);
    setLanguageValue(code);

    if (code === "en") setLocalization(ENG_LOCALIZATION);
    else if (code === "sr") setLocalization(SRB_LOCALIZATION);
  };

  const getLanguageFromStorage = async () => {
    try {
      const code = await getLanguageValue();
      if (code) changeLocalization({ code });
      else setLocalization(SRB_LOCALIZATION);
    } catch (error) {
      setLocalization(SRB_LOCALIZATION);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLanguageFromStorage();
  }, []);

  if (loading) return null; // ili loader komponenta

  return (
    <LocalizationContext.Provider value={{ localization, changeLocalization, isLoading }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationContext;
