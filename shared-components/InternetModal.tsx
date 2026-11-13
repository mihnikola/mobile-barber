import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalization } from "@/context/LocalizationContext";
import { ColorsBarber } from "@/constants/Colors";
import { colors, fonts } from "@/theme";

export default function NoInternetModal({ visible }) {
  const { localization } = useLocalization();

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true} 
    >
      <View style={styles.overlay}>
        <View style={styles.box}>
          <MaterialIcons
            name="signal-wifi-off"
            size={80}
            color={colors.textMuted}
            style={{ marginBottom: 20 }}
          />
          <Text style={styles.title}> {localization.INTERNET.title}</Text>
          <Text style={styles.sub}> {localization.INTERNET.error}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "85%",
    padding: 30,
    backgroundColor: ColorsBarber.dark.backgroundModal,
    borderRadius: 16,
    alignItems: "center",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: ColorsBarber.dark.textColor,
    marginBottom: 10,
    textAlign: "center",
  },
  sub: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 25,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.dangerSoft,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: ColorsBarber.dark.textColor,
    fontSize: 16,
    fontFamily: fonts.bold,
  },
});
