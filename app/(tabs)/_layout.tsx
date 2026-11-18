import { useLocalization } from "@/context/LocalizationContext";
import { SplashScreen, Tabs } from "expo-router";
import { useEffect } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { brand, fonts, makeStyles, radii, useTheme } from "@/theme";
import { Icon, type IconName } from "@/components/ui";

/**
 * Content height above the bottom safe area.
 * 2pt item padding + 5pt tab padding + 28pt icon slot + 4pt gap + 16pt label + 5pt tab padding + 2pt
 * item padding = 62, plus 2pt so the line box is not flush with the bar. React Navigation's default
 * content height is 49pt, so the label overflows. Devices with a home indicator were painting that
 * overflow into the inset; iPhone SE has no bottom inset, so the screen edge clips the labels.
 */
const TAB_BAR_CONTENT_HEIGHT = 64;

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
  const insets = useSafeAreaInsets();
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
          tabBarStyle: [
            styles.bar,
            { height: TAB_BAR_CONTENT_HEIGHT + insets.bottom, paddingBottom: insets.bottom },
          ],
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
            tabBarIcon: ({ focused }) => <TabIcon name={brand.details.bookIcon} focused={focused} />,
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
  // ds-nav: surface, hairline on top. Height (including the bottom inset) is set in TabLayout.
  bar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.line,
    borderTopWidth: 1,
  },
  item: { paddingVertical: 2 },
  label: { fontFamily: fonts.sansMedium, fontSize: 12, lineHeight: 16, marginTop: 4 },
  pill: { width: 56, height: 30, borderRadius: radii.pill, alignItems: "center", justifyContent: "center" },
  pillActive: { backgroundColor: colors.accentSoft },
}));
