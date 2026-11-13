import React from "react";
import { Modal, View } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import { fonts, makeStyles } from "@/theme";
import { AppText, Icon } from "@/components/ui";

export default function NoInternetModal({ visible }) {
  const styles = useStyles();
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
          <Icon name="wifiOff" size={80} style={{ marginBottom: 20 }} color="inkFaint" />
          <AppText variant="displayMd" style={styles.title}> {localization.INTERNET.title}</AppText>
          <AppText style={styles.sub}> {localization.INTERNET.error}</AppText>
        </View>
      </View>
    </Modal>
  );
}

const useStyles = makeStyles((colors) => ({
  overlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: colors.scrim,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "85%",
    padding: 30,
    backgroundColor: colors.surface,
    borderRadius: 16,
    alignItems: "center",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
  },
  sub: {
    fontSize: 16,
    color: colors.inkMuted,
    marginBottom: 25,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.danger,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.ink,
    fontSize: 16,
    fontFamily: fonts.sansSemiBold,
  },
}));
