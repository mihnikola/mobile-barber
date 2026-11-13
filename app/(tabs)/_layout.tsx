import { useLocalization } from "@/context/LocalizationContext";
import { SplashScreen, Tabs } from "expo-router";
import { useEffect } from "react";
import { Pressable, View } from "react-native";
import { fonts, makeStyles, useTheme } from "@/theme";
import { Icon, type IconName } from "@/components/ui";

/** Tab icon in the design-system nav pill (`ds-nav__pill`): accent on accentSoft when active. */
function TabIcon({ name, focused }: { name: IconName; focused: boolean }) {
  const styles = useStyles();
  return (
    <View style={[styles.pill, focused && styles.pillActive]}>
      <Icon name={name} size="md" color={focused ? "accent" : "inkMuted"} />
    </View>
  );
}

export default function TabLayout() {
  const { colors } = useTheme();
  const styles = useStyles();
  const { localization } = useLocalization();
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.ink,
          tabBarInactiveTintColor: colors.inkMuted,
          tabBarStyle: styles.bar,
          tabBarItemStyle: styles.item,
          tabBarLabelStyle: styles.label,
          // short cross-fade between tabs
          animation: "fade",
          transitionSpec: { animation: "timing", config: { duration: 150 } },
          // plain Pressable: no Android ripple / press dimming (design has only the active pill)
          tabBarButton: ({ ref: _ref, android_ripple: _r, pressColor: _p, pressOpacity: _o, hoverEffect: _h, href: _href, ...rest }) => (
            <Pressable {...rest} />
          ),
        }}
      >
        <Tabs.Screen
          name="(01_home)"
          options={{
            title: localization.TABS.HOME,
            tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="(02_barbers)"
          options={{
            title: localization.TABS.BARBERS,
            tabBarIcon: ({ focused }) => <TabIcon name="scissors" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="(03_calendar)"
          options={{
            title: localization.TABS.APPOINTMENTS,
            tabBarIcon: ({ focused }) => <TabIcon name="calendar" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="(04_settings)"
          options={{
            title: localization.TABS.SETTINGS,
            tabBarIcon: ({ focused }) => <TabIcon name="person" focused={focused} />,
          }}
        />
      </Tabs>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.bg },
  // ds-nav: surface, hairline on top
  bar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.line,
    borderTopWidth: 1,
    // height/padding left to React Navigation so the bottom safe-area inset is kept
  },
  item: { paddingVertical: 2 },
  label: { fontFamily: fonts.sansMedium, fontSize: 12, marginTop: 4 },
  pill: { width: 56, height: 30, borderRadius: 999, alignItems: "center", justifyContent: "center" },
  pillActive: { backgroundColor: colors.accentSoft },
}));
