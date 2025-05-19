import { Tabs, useNavigation, useRouter } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BackHandler, Platform } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [tabHistory, setTabHistory] = useState(['index']); // Start with the initial tab
  const navigation = useNavigation();
  const route = useRouter();
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      if (tabHistory[tabHistory.length - 1] !== e.target.name) {
        setTabHistory(prev => [...prev, e.target.name]);
      }
    });
    return unsubscribe;
  }, [navigation, tabHistory]);

  const handleBackButton = useCallback(() => {
    if (tabHistory.length > 1) {
      const previousTab = tabHistory[tabHistory.length - 2];
      setTabHistory(prev => prev.slice(0, -1)); // Remove the current tab
      navigation.navigate(previousTab);
      return true; // Prevent default back behavior
    }
    return false; // Allow default behavior if only one tab in history
  }, [navigation, tabHistory, setTabHistory]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  }, [handleBackButton]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="employers"
        options={{
          title: "Employers",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="content.cut" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="calendar.month" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="notifications.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
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
