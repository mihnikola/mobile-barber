import { coverImageAppointments } from "@/constants";
import { useLocalization } from "@/context/LocalizationContext";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  View,
} from "react-native";
import { makeStyles } from "@/theme";
import { AppText, Pressable } from "@/components/ui";
import { routes } from "@/lib/navigation/routes";

function AppointmentsNonToken() {
  const styles = useStyles();
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
        <AppText variant="body" style={styles.description}>
          {localization.APPOINTMENTS.noLogin}
        </AppText>
      </View>
      <Pressable onPress={routeHandler}>
        <AppText variant="title" style={styles.capture}> {localization.APPOINTMENTS.login}</AppText>
      </Pressable>
    </ScrollView>
  );
}
const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  card: {
    backgroundColor: colors.bg,
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
}));
export default AppointmentsNonToken;
