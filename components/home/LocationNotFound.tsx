import { ColorsBarber } from "@/constants/Colors";
import { TouchableOpacity } from "@/shared-components/TouchableOpacity";
import {
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, fonts } from "@/theme";

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
          <Text style={styles.modalTitle}>{title}</Text>

          <TouchableOpacity onPress={onConfirm} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.88)",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: ColorsBarber.dark.backgroundModal,
    borderRadius: 12,
    shadowColor: ColorsBarber.dark.background,
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
   color: ColorsBarber.dark.textColor,
  },

  modalTitle: {
    color: colors.text,
    fontSize: 22,
    fontFamily: fonts.bold,
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 10,
  },
  actionButton: {
    width: "100%",
    backgroundColor: ColorsBarber.dark.background,
    paddingVertical: 16,
    marginTop: 20,
    borderRadius: 8,
    shadowColor: ColorsBarber.dark.background,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    color: colors.text,
    fontSize: 22,
    fontFamily: fonts.regular,
    textAlign: "center",
  },
});

export default LocationNotFound;
