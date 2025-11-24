import { ReservationProvider } from "@/context/ReservationContext";
import { LocalizationProvider } from "@/context/LocalizationContext";
import { CompanyProvider } from "@/context/CompanyContext";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { AuthProvider } from "@/context/AuthContext";
import { GlobalErrorProvider } from "@/context/GlobalErrorContext";
import GlobalErrorHandler from "@/shared-components/GlobalErrorHandler";
import { NotificationProvider } from "@/context/NotificationProvider";

export default function AppInitialized(props) {
  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#000000",
    },
  };

  return (
    <ThemeProvider value={MyDarkTheme}>
      <LocalizationProvider>
        <CompanyProvider>
          <AuthProvider>
            <GlobalErrorProvider>
              <GlobalErrorHandler />
              <ReservationProvider>{props.children}</ReservationProvider>
            </GlobalErrorProvider>
          </AuthProvider>
        </CompanyProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
