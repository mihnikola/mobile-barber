import { useLocalization } from "@/context/LocalizationContext";
import { SplashScreen, Tabs } from "expo-router";
import { ColorsBarber } from "@/constants/Colors";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { fonts } from "@/theme";
import { Icon } from "@/components/ui";

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
          tabBarActiveTintColor: ColorsBarber.dark.textColor,
          tabBarInactiveTintColor: ColorsBarber.dark.inActiveTextColor,
          tabBarStyle: {
            backgroundColor: ColorsBarber.dark.background,
          },
          tabBarLabelStyle: {
            fontFamily: fonts.regular,
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="(01_home)"
          options={{
            title: localization.TABS.HOME,
            tabBarIcon: ({ color, focused }) => (
              <Icon name="homeAlt" size={28} rawColor={focused
                    ? ColorsBarber.dark.textColor
                    : ColorsBarber.dark.inActiveTextColor} />
            ),
          }}
        />
        <Tabs.Screen
          name="(02_barbers)"
          options={{
            title: localization.TABS.BARBERS,
            tabBarIcon: ({ color, focused }) => (
              <Icon name="scissors" size={28} rawColor={focused
                    ? ColorsBarber.dark.textColor
                    : ColorsBarber.dark.inActiveTextColor} />
            ),
          }}
        />
        <Tabs.Screen
          name="(03_calendar)"
          options={{
            title: localization.TABS.APPOINTMENTS,
            tabBarIcon: ({ color, focused }) => (
              <Icon name="calendarMonth" size={28} rawColor={focused
                    ? ColorsBarber.dark.textColor
                    : ColorsBarber.dark.inActiveTextColor} />
            ),
          }}
        />

        <Tabs.Screen
          name="(04_settings)"
          options={{
            title: localization.TABS.SETTINGS,
            tabBarIcon: ({ color, focused }) => (
              <Icon name="services" size={28} rawColor={focused
                    ? ColorsBarber.dark.textColor
                    : ColorsBarber.dark.inActiveTextColor} />
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
    backgroundColor: ColorsBarber.dark.background,
  },
});
