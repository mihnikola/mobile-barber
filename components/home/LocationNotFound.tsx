import {
  Modal,
  View,
} from "react-native";
import { makeStyles } from "@/theme";
import { AppText, Pressable } from "@/components/ui";

function LocationNotFound({
  modalVisible,
  setModalVisible,
  buttonText,
  title,
}) {
  const styles = useStyles();
  const onConfirm = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onConfirm}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <AppText variant="legacyHeading" style={styles.modalTitle}>{title}</AppText>

          <Pressable onPress={onConfirm} style={styles.actionButton}>
            <AppText variant="legacyBody" size={22} style={styles.actionButtonText}>{buttonText}</AppText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
const useStyles = makeStyles((colors) => ({
  overlay: {
    flex: 1,
    backgroundColor: colors.scrim,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    shadowColor: colors.bg,
    padding: 32,
    width: "100%",
    maxHeight: "60%",
  },
  item: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  itemSubtitle: {
    flex: 2,
    fontSize: 16,
   color: colors.ink,
  },

  modalTitle: {
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 10,
  },
  actionButton: {
    width: "100%",
    backgroundColor: colors.bg,
    paddingVertical: 16,
    marginTop: 20,
    borderRadius: 8,
    shadowColor: colors.bg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    textAlign: "center",
  },
}));

export default LocationNotFound;
