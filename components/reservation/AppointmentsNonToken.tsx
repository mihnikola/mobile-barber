import { coverImageAppointments } from "@/constants";
import { useLocalization } from "@/context/LocalizationContext";
import HeaderCoverImageContainer from "@/shared-components/HeaderCoverImageContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, fonts } from "@/theme";
import { Pressable } from "@/components/ui";

function AppointmentsNonToken() {
  const { localization } = useLocalization();
  const routeHandler = () => {
    router.push({
      pathname: "/(z_auth)/",
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
        <Text style={styles.description}>
          {localization.APPOINTMENTS.noLogin}
        </Text>
      </View>
      <Pressable onPress={routeHandler}>
        <Text style={styles.capture}> {localization.APPOINTMENTS.login}</Text>
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
    fontSize: 20,
    textAlign: "center",
    padding: 0,
    fontFamily: fonts.bold,
   color: colors.text,
  },
  description: {
    fontSize: 16,
   color: colors.text,
    fontFamily: fonts.regular,

    textAlign: "center",
  },
});
export default AppointmentsNonToken;
