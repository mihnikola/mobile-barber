import { ReservationProvider } from "@/context/ReservationContext";
import { LocalizationProvider } from "@/context/LocalizationContext";
import { CompanyProvider } from "@/context/CompanyContext";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { AuthProvider } from "@/context/AuthContext";
import { GlobalErrorProvider } from "@/context/GlobalErrorContext";
import GlobalErrorHandler from "@/shared-components/GlobalErrorHandler";
import { InternetProvider } from "@/context/InternetContext";
import NotificationWrapper from "./NotificationWrapper";
import { AppointmentProvider } from "@/context/AppointmentContext";

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
      <InternetProvider>
        <LocalizationProvider>
          <CompanyProvider>
            <AuthProvider>
              <NotificationWrapper>
                <GlobalErrorProvider>
                  <GlobalErrorHandler />
                  <ReservationProvider>
                    <AppointmentProvider>{props.children}</AppointmentProvider>
                  </ReservationProvider>
                </GlobalErrorProvider>
              </NotificationWrapper>
            </AuthProvider>
          </CompanyProvider>
        </LocalizationProvider>
      </InternetProvider>
    </ThemeProvider>
  );
}
