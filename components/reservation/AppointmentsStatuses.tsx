import { useLocalization } from "@/context/LocalizationContext";
import {
  View,
  Text,
} from "react-native";
import { fonts, makeStyles, useTheme } from "@/theme";
import { Pressable } from "@/components/ui";

export default function AppointmentsStatuses({ active, handleStatus }) {
  const { colors } = useTheme();
  const styles = useStyles();
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
          <Pressable
            key={status.id}
            onPress={() => handleStatus(status.id)}
            style={[
              styles.tab,
              { borderColor: isActive ? colors.white : colors.disabled },
            ]}
          >
            <Text style={[styles.text, isActive && styles.activeText]}>
              {status.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: {
    flexDirection: "row", // Ređa elemente horizontalno u red
    // zIndex: 9999, // Gura komponentu na sam vrh slojeva (iOS)
    // elevation: 5, // Gura komponentu na sam vrh slojeva (Android)
  },
  activeText: {
    color: colors.text, // Tekst pobeli kada je aktivan
    fontFamily: fonts.bold,
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
    backgroundColor: colors.background, // Dark background from your image
    color: colors.text,
    borderBottomColor: colors.background,
  },

  text: {
    color: colors.text, // Neutralna svetlo-siva boja teksta za neaktivne elemente
    fontSize: 18, // Kompaktna veličina fonta da se ne prelomi u visini od 20px
    fontFamily: fonts.regular, // Srednje podebljan tekst za bolju čitljivost
  },
}));
