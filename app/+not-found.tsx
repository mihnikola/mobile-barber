import { Link, Stack } from "expo-router";
import { View } from "react-native";

import { AppText } from "@/components/ui";
import { makeStyles } from "@/theme";
import { routes } from "@/lib/navigation/routes";

/** 404 route. Was crashing before (B17: `components/Themed` imported a non-existent default export). */
export default function NotFoundScreen() {
  const styles = useStyles();
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <AppText variant="legacyTitle">This screen doesn&apos;t exist.</AppText>

        <Link href={routes.root} style={styles.link}>
          <AppText variant="legacyBody" color="linkAlt">Go to home screen!</AppText>
        </Link>
      </View>
    </>
  );
}

const useStyles = makeStyles((colors) => ({
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
}));
