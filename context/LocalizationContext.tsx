import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { ENG_LOCALIZATION as ENG_BASE } from "../helpers/en-locale";
import { SRB_LOCALIZATION as SRB_BASE } from "../helpers/srb-locale";
import { withBrandWording } from "@/helpers/brandWording";
import { getLanguageValue, setLanguageValue } from "../helpers/language";
import { getStorage } from "@/helpers/token";

import type { Localization, LocalizationContextValue } from "./types";
import { usersApi } from "@/lib/api/services";

// base texts + the active brand's wording ("Tim" instead of "Frizeri" for the salon, D-025)
const ENG_LOCALIZATION = withBrandWording(ENG_BASE, "en");
const SRB_LOCALIZATION = withBrandWording(SRB_BASE, "sr");

const LocalizationContext = createContext<LocalizationContextValue | null>(null);

export const useLocalization = () => useContext(LocalizationContext) as LocalizationContextValue;

export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
  // null only until the stored language is read; children render after that
  const [localization, setLocalization] = useState<Localization | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const changeFirebaseLocalization = async (lang: string) => {
    setIsLoading(true);

    const langData = lang === "en" ? "en" : "sr";
    try {
      const token = await getStorage();
      if (!token) return;
      await usersApi.changeLanguage(token,  { langData });
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const changeLocalization = (language: { code: string }) => {
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
    } catch {
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
    <LocalizationContext.Provider value={{ localization: localization as Localization, changeLocalization, isLoading }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationContext;
