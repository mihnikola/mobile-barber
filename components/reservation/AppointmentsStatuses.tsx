import { ColorsBarber } from "@/constants/Colors";
import { useLocalization } from "@/context/LocalizationContext";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";


export default function AppointmentsStatuses({ active, handleStatus }) {
  const { localization } = useLocalization();
  const STATUSES = [
    {
      id: "pending",
      label: localization.APPOINTMENTS.pending,
    },

    {
      id: "approved",
      label: localization.APPOINTMENTS.approved,
    },
    {
      id: "rejected",
      label: localization.APPOINTMENTS.rejected,
    },
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
              { borderColor: isActive ? "#999090" : "#3d3d3d" },
            ]}
          >
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
    gap: 1,
    flexDirection: "row", // Ređa elemente horizontalno u red
    alignItems: "center", // Centrira tekst i kružiće vertikalno unutar 20px
    justifyContent: "space-around",
    zIndex: 9999, // Gura komponentu na sam vrh slojeva (iOS)
    elevation: 5, // Gura komponentu na sam vrh slojeva (Android)
  },
  activeText: {
    color: ColorsBarber.light.textColor, // Tekst pobeli kada je aktivan
    fontFamily: "OldStandard-Bold",
    fontSize: 19,
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
    backgroundColor: ColorsBarber.light.background, // Dark background from your image
   color: ColorsBarber.light.textColor,
    borderColor: '#8a2727',
    borderBottomColor: ColorsBarber.light.background
  },
  dot: {
    width: 9, // Prečnik kružića
    height: 9,
    borderRadius: 3.5, // Pravi savršen krug
    marginRight: 3, // Razmak između kružića i teksta
  },
  text: {
    color: ColorsBarber.light.textColor, // Neutralna svetlo-siva boja teksta za neaktivne elemente
    fontSize: 18, // Kompaktna veličina fonta da se ne prelomi u visini od 20px
    fontFamily: "OldStandard-Regular", // Srednje podebljan tekst za bolju čitljivost
  },
});
