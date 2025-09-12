import { createContext, useContext, useState } from "react";
import { ENG_LOCALIZATION } from "../helpers/en-locale";
import { SRB_LOCALIZATION } from "../helpers/srb-locale";
const LocalizationContext = createContext(null);
export const useLocalization = () => {
    return useContext(LocalizationContext);
};


export const LocalizationProvider = ({ children }) => {
    const [localization, setLocalization] = useState(ENG_LOCALIZATION);

    const changeLocalization = (language) => {
        const { code } = language;

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
