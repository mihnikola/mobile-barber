import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalization } from "@/context/LocalizationContext";
import { SplashScreen, Tabs } from "expo-router";
import { ColorsBarber } from "@/constants/Colors";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function TabLayout() {
  const { localization } = useLocalization();
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: ColorsBarber.light.textColor,
          tabBarInactiveTintColor: ColorsBarber.light.inActiveTextColor,
          tabBarStyle: {
            backgroundColor: ColorsBarber.light.background,
          },
          tabBarLabelStyle: {
            fontFamily: "OldStandard-Regular",
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="(01_home)"
          options={{
            title: localization.TABS.HOME,
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                size={28}
                name="home"
                color={
                  focused
                    ? ColorsBarber.light.textColor
                    : ColorsBarber.light.inActiveTextColor
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(02_barbers)"
          options={{
            title: localization.TABS.BARBERS,
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                size={28}
                name="content-cut"
                color={
                  focused
                    ? ColorsBarber.light.textColor
                    : ColorsBarber.light.inActiveTextColor
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(03_calendar)"
          options={{
            title: localization.TABS.APPOINTMENTS,
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                size={28}
                name="calendar-month"
                color={
                  focused
                    ? ColorsBarber.light.textColor
                    : ColorsBarber.light.inActiveTextColor
                }
              />
            ),
          }}
        />

        <Tabs.Screen
          name="(04_settings)"
          options={{
            title: localization.TABS.SETTINGS,
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                size={28}
                name="miscellaneous-services"
                color={
                  focused
                    ? ColorsBarber.light.textColor
                    : ColorsBarber.light.inActiveTextColor
                }
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsBarber.light.background,
  },
});
