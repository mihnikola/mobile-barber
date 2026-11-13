import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui";
import { colors } from "@/theme";

/** 404 route. Was crashing before (B17: `components/Themed` imported a non-existent default export). */
export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <AppText variant="title">This screen doesn&apos;t exist.</AppText>

        <Link href="/" style={styles.link}>
          <AppText color="linkAlt">Go to home screen!</AppText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.background,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
