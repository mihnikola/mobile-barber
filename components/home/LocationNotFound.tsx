import {
  Modal,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "@/theme";
import { AppText, Pressable } from "@/components/ui";

function LocationNotFound({
  modalVisible,
  setModalVisible,
  buttonText,
  title,
}) {
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
          <AppText variant="heading" style={styles.modalTitle}>{title}</AppText>

          <Pressable onPress={onConfirm} style={styles.actionButton}>
            <AppText size={22} style={styles.actionButtonText}>{buttonText}</AppText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: colors.surfaceModal,
    borderRadius: 12,
    shadowColor: colors.background,
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
   color: colors.text,
  },

  modalTitle: {
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 10,
  },
  actionButton: {
    width: "100%",
    backgroundColor: colors.background,
    paddingVertical: 16,
    marginTop: 20,
    borderRadius: 8,
    shadowColor: colors.background,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    textAlign: "center",
  },
});

export default LocationNotFound;
