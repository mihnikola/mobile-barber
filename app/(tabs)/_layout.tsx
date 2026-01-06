import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalization } from "@/context/LocalizationContext";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const { localization } = useLocalization();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "black", // Set the background color to black
        },
      }}
    >
      <Tabs.Screen
        name="(01_home)"
        options={{
          title: localization.TABS.HOME,
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(02_barbers)"
        options={{
          title: localization.TABS.BARBERS,
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="content-cut" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(03_calendar)"
        options={{
          title: localization.TABS.APPOINTMENTS,
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="calendar-month" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(04_settings)"
        options={{
          title: localization.TABS.SETTINGS,
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              size={28}
              name="miscellaneous-services"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
