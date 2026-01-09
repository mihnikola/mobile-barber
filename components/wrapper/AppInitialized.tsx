import { ReservationProvider } from "@/context/ReservationContext";
import { LocalizationProvider } from "@/context/LocalizationContext";
import { CompanyProvider } from "@/context/CompanyContext";
import {
  DarkTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { AuthProvider } from "@/context/AuthContext";
import { GlobalErrorProvider } from "@/context/GlobalErrorContext";
import GlobalErrorHandler from "@/shared-components/GlobalErrorHandler";
import { InternetProvider } from "@/context/InternetContext";
import NotificationWrapper from "./NotificationWrapper";
import { AppointmentProvider } from "@/context/AppointmentContext";
import { NavigationProvider } from "@/context/NavigationContext";



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
                  <NavigationProvider>
                    <ReservationProvider>
                      <AppointmentProvider>
                        {props.children}
                      </AppointmentProvider>
                    </ReservationProvider>
                  </NavigationProvider>
                </GlobalErrorProvider>
              </NotificationWrapper>
            </AuthProvider>
          </CompanyProvider>
        </LocalizationProvider>
      </InternetProvider>
    </ThemeProvider>
  );
}
