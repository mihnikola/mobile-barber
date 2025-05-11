import { LocaleConfig } from "react-native-calendars";

// Set up locale for Serbian language
LocaleConfig.locales["srb"] = {
    monthNames: [
      "Januar",
      "Februar",
      "Mart",
      "April",
      "Maj",
      "Jun",
      "Jul",
      "Avgust",
      "Septembar",
      "Octobar",
      "Novembar",
      "Decembar",
    ],
    dayNames: [
      "Nedelja",
      "Ponedeljak",
      "Utorak",
      "Sreda",
      "Cetvrtak",
      "Petak",
      "Subota",
    ],
    dayNamesShort: ["Ned", "Pon", "Uto", "Sre", "Cet", "Pet", "Sub"],
  };
  LocaleConfig.defaultLocale = "srb";