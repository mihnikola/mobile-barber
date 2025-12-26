import { useCompany } from "@/context/CompanyContext";
import { useLocalization } from "@/context/LocalizationContext";
import SharedTabHeader from "@/shared-components/SharedTabHeader";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function AppointmentsNonToken() {
  const { company } = useCompany();
  const { localization } = useLocalization();
  const routeHandler = () => {
    router.push({
      pathname: "/(z_auth)/",
      params: { data: "appointments" },
    });
  };
  return (
    <ScrollView style={styles.container}>
      <SharedTabHeader
        image={company?.media?.coverImageAppointments}
        title={localization.APPOINTMENTS.title}
      />
      <View style={styles.card}>
        <Text style={styles.description}>
          {localization.APPOINTMENTS.noLogin}
        </Text>
      </View>
      <TouchableOpacity onPress={routeHandler}>
        <Text style={styles.capture}> {localization.APPOINTMENTS.login}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  card: {
    backgroundColor: "black",
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
    fontWeight: "700",
    color: "white",
  },
  description: {
    fontSize: 16,
    color: "grey",
    textAlign: "center",
  },
});
export default AppointmentsNonToken;
