import { ReservationProvider } from "@/context/ReservationContext";
import { LocalizationProvider } from "@/context/LocalizationContext";
import { CompanyProvider } from "@/context/CompanyContext";
import { AuthProvider } from "@/context/AuthContext";
import { GlobalErrorProvider } from "@/context/GlobalErrorContext";
import GlobalErrorHandler from "@/components/app/GlobalErrorHandler";
import { InternetProvider } from "@/context/InternetContext";
import NotificationWrapper from "./NotificationWrapper";
import { AppointmentProvider } from "@/context/AppointmentContext";
import { NavigationProvider } from "@/context/NavigationContext";
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from "expo-router";
import { useTheme } from "@/theme";



export default function AppInitialized(props) {
  const { colors, scheme } = useTheme();
  // navigation (headers, screen background) follows the app theme
  const base = scheme === "dark" ? DarkTheme : DefaultTheme;
  const navigationTheme = { ...base, colors: { ...base.colors, background: colors.bg } };

  return (
    <NavigationThemeProvider value={navigationTheme}>
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
    </NavigationThemeProvider>
  );
}
