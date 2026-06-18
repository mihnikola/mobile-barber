import { useLocalization } from "@/context/LocalizationContext";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

// Uzimamo tačnu širinu ekrana telefona
const { width } = Dimensions.get("window");

export default function AppointmentsStatuses({ active, handleStatus }) {
  const { localization } = useLocalization();
  const STATUSES = [
    {
      id: "pending",
      label: localization.APPOINTMENTS.pending,
      color: "#eab308",
    }, // Žuta/Zlatna
    {
      id: "rejected",
      label: localization.APPOINTMENTS.rejected,
      color: "#ef4444",
    }, // Crvena
    {
      id: "approved",
      label: localization.APPOINTMENTS.approved,
      color: "#22c55e",
    }, // Zelena
  ];
  return (
    <View style={styles.container}>
      {STATUSES.map((status) => {
        const isActive = active === status.id;

        return (
          <TouchableOpacity
            key={status.id}
            onPress={() => handleStatus(status.id)}
            style={[
              styles.tab,
              { borderBottomColor: isActive ? "#fff" : "#000" },
            ]}
          >
            <View style={[styles.dot, { backgroundColor: status.color }]} />
            <Text style={[styles.text, isActive && styles.activeText]}>
              {status.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width, // Širina celog ekrana
    height: 50, // Fiksna visina zahtevana po specifikaciji
    flexDirection: "row", // Ređa elemente horizontalno u red
    alignItems: "center", // Centrira tekst i kružiće vertikalno unutar 20px
    justifyContent: "space-around",
    position: "absolute",
    bottom: 20,
    top: 142,
    marginTop: 10,
    // DODAJ OVE DVE LINIJE:
    zIndex: 9999, // Gura komponentu na sam vrh slojeva (iOS)
    elevation: 5, // Gura komponentu na sam vrh slojeva (Android)
  },
  activeText: {
    color: "#ffffff", // Tekst pobeli kada je aktivan
    fontWeight: "700",
  },
  tab: {
    flex: 1, // Deli prostor na 3 potpuno jednaka dela (lepo razvučeno)
    flexDirection: "row", // Stavke unutar taba (krug + tekst) idu jedno pored drugog
    alignItems: "center", // Centrira krug i tekst međusobno
    justifyContent: "center", // Centrira sadržaj unutar trećine ekrana
    padding: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderWidth: 1,
    backgroundColor: "#000000", // Dark background from your image
    color: "white",
  },
  dot: {
    width: 12, // Prečnik kružića
    height: 12,
    borderRadius: 3.5, // Pravi savršen krug
    marginRight: 6, // Razmak između kružića i teksta
  },
  text: {
    color: "#a3a3a3", // Neutralna svetlo-siva boja teksta za neaktivne elemente
    fontSize: 18, // Kompaktna veličina fonta da se ne prelomi u visini od 20px
    fontWeight: "500", // Srednje podebljan tekst za bolju čitljivost
    letterSpacing: 0.8, // Blagi razmak između slova za "premium" izgled
  },
});
