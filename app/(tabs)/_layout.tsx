import { IconSymbol } from "@/components/ui/IconSymbol";
import { Tabs } from "expo-router";

export default function TabLayout() {
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
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(02_barbers)"
        options={{
          title: "Barbers",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="content.cut" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(03_calendar)"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="calendar.month" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(04_settings)"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="miscellaneous.services" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
