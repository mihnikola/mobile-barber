import { createContext, useContext, useEffect, useState } from "react";
import { ENG_LOCALIZATION } from "../helpers/en-locale";
import { SRB_LOCALIZATION } from "../helpers/srb-locale";
import { getLanguageValue, setLanguageValue } from "../helpers/language";
import { put } from "@/api/apiService";
import { getStorage } from "@/helpers/token";

const LocalizationContext = createContext(null);
export const useLocalization = () => {
  return useContext(LocalizationContext);
};
export const LocalizationProvider = ({ children }) => {
  const [localization, setLocalization] = useState(SRB_LOCALIZATION);
  const changeFirebaseLocalization = async (lang) => {
    const langData = lang === "en" ? "eng" : "srp";
    try {
      const token = await getStorage();
      if(!token){
        return;
      }
      const response = await put(`/users/${token}/changeLanguage`, {
        langData,
        
      });
      console.log("response",response)
    } catch (error) {
      console.log("error",error)
    }
  };

  const getLanguageFromStorage = async () => {
    await getLanguageValue().then((res) => {
      if (res) {
        const prom = { code: res };
        changeLocalization(prom);
      } else {
        setLocalization(SRB_LOCALIZATION);
      }
    });
  };
  useEffect(() => {
    getLanguageFromStorage();
  }, []);

  const changeLocalization = (language) => {
    const { code } = language;
    changeFirebaseLocalization(code);
    setLanguageValue(code);
    if (code === "en") {
      setLocalization(ENG_LOCALIZATION);
    }
    if (code === "sr") {
      setLocalization(SRB_LOCALIZATION);
    }
  };
  return (
    <LocalizationContext.Provider value={{ localization, changeLocalization }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationContext;
