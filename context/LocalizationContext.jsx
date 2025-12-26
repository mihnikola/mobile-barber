import { createContext, useContext, useEffect, useState } from "react";
import { ENG_LOCALIZATION } from "../helpers/en-locale";
import { SRB_LOCALIZATION } from "../helpers/srb-locale";
import { getLanguageValue, setLanguageValue } from "../helpers/language";
import { put } from "@/api/apiService";
import { getStorage } from "@/helpers/token";

const LocalizationContext = createContext(null);

export const useLocalization = () => useContext(LocalizationContext);

export const LocalizationProvider = ({ children }) => {
  const [localization, setLocalization] = useState(null); // ⚠️ null initially
  const [loading, setLoading] = useState(true);

  const changeFirebaseLocalization = async (lang) => {
    const langData = lang === "en" ? "en" : "sr";
    try {
      const token = await getStorage();
      console.log("changeFirebaseLocalization",token)

      if (!token) return;
      await put(`/users/${token}/changeLanguage`, { langData });
    } catch (error) {
      console.log("changeFirebaseLocalization error", error);
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
    <LocalizationContext.Provider value={{ localization, changeLocalization }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationContext;
