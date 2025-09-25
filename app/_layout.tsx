import { ReservationProvider } from "@/context/ReservationContext";
import { LocalizationProvider } from "@/context/LocalizationContext";
import { CompanyProvider } from "@/context/CompanyContext";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import MainContainer from "../components/mainContainer/MainContainer";
import SplashScreen from "@/shared-components/SuccessScreen";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  // Create a custom dark theme with your desired background color
  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#000000",
    },
  };

  if (!isLoading) {
    return (
      <ThemeProvider value={MyDarkTheme}>
        <LocalizationProvider>
          <CompanyProvider>
            <AuthProvider>
              <ReservationProvider>
                <MainContainer />
              </ReservationProvider>
            </AuthProvider>
          </CompanyProvider>
        </LocalizationProvider>
      </ThemeProvider>
    );
  }
}
