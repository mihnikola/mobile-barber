import { coverImageAppointments } from "@/constants";
import { useLocalization } from "@/context/LocalizationContext";
import HeaderCoverImageContainer from "@/shared-components/HeaderCoverImageContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "@/theme";
import { AppText, Pressable } from "@/components/ui";
import { routes } from "@/lib/navigation/routes";

function AppointmentsNonToken() {
  const { localization } = useLocalization();
  const routeHandler = () => {
    router.push({
      pathname: routes.auth.login,
      params: { data: "appointments" },
    });
    AsyncStorage.setItem("paramLogin", "appointments");

  };
  return (
    <ScrollView style={styles.container}>
      <HeaderCoverImageContainer
        title={localization.APPOINTMENTS.title}
        image={coverImageAppointments}
        hidden
      />
      <View style={styles.card}>
        <AppText variant="bodyLg" style={styles.description}>
          {localization.APPOINTMENTS.noLogin}
        </AppText>
      </View>
      <Pressable onPress={routeHandler}>
        <AppText variant="title" style={styles.capture}> {localization.APPOINTMENTS.login}</AppText>
      </Pressable>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  card: {
    backgroundColor: colors.background,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: 20,
    borderRadius: 20,
    padding: 30,
    gap: 20,
    height: 100,
  },
  capture: {
    textAlign: "center",
    padding: 0,
  },
  description: {

    textAlign: "center",
  },
});
export default AppointmentsNonToken;
