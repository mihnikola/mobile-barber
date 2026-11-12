import { ColorsBarber } from "@/constants/Colors";
import { Modal, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "./TouchableOpacity";

export const SharedQuestion = ({
  isOpen,
  onClose,
  icon,
  title,
  buttonTextYes,
  onLogOut,
  buttonTextNo,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>{icon}</View>

          <Text style={styles.modalTitle}>{title}</Text>

          <View style={styles.buttons}>
            <TouchableOpacity onPress={onLogOut} style={styles.actionButtonYes}>
              <Text style={styles.actionButtonText}>{buttonTextYes}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.actionButtonNo}>
              <Text style={styles.actionButtonTextNo}>{buttonTextNo}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttons: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  container: {
    flex: 1, // Takes up the whole screen
    backgroundColor: ColorsBarber.dark.background, // Corresponds to bg-gray-900
    alignItems: "center", // Centers content horizontally
    justifyContent: "center", // Centers content vertically
    padding: 16,
  },

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
    borderWidth: 1,
    padding: 32,
    maxWidth: 384,
    width: "100%",
    alignItems: "center",
  },

  iconContainer: {
    width: 96, // Corresponds to w-24
    height: 96, // Corresponds to h-24
    backgroundColor: ColorsBarber.dark.background, // Corresponds to bg-blue-900 bg-opacity-30
    borderWidth: 1,
    borderColor: ColorsBarber.dark.borderColor,
    borderRadius: 9999, // Corresponds to rounded-full
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24, // Corresponds to mb-6
  },
  modalTitle: {
    color: ColorsBarber.dark.textColor, // Corresponds to text-white
    fontFamily: "OldStandard-Regular",
    fontSize: 20, // Corresponds to text-3xl
    marginBottom: 16, // Corresponds to mb-4
    textAlign: "center",
    lineHeight: 36, // Corresponds to leading-tight
  },
  modalDescription: {
    color: "#9CA3AF", // Corresponds to text-gray-400
    fontSize: 18, // Corresponds to text-lg
    marginBottom: 32, // Corresponds to mb-8
    textAlign: "center",
  },
  actionButton: {
    width: "50%", // Corresponds to w-full
    backgroundColor: ColorsBarber.dark.btnBgColor,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ColorsBarber.dark.borderColor,
    shadowColor: ColorsBarber.dark.background,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonYes: {
    width: "50%", // Corresponds to w-full
    backgroundColor: ColorsBarber.dark.btnBgColor,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ColorsBarber.dark.borderColor,
    shadowColor: ColorsBarber.dark.background,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonNo: {
    width: "50%", // Corresponds to w-full
    backgroundColor: ColorsBarber.dark.btnBgColorDisabled,
    borderWidth: 1,
    borderColor: ColorsBarber.dark.borderColor,
    paddingVertical: 16, // Corresponds to py-4
    borderRadius: 8, // Corresponds to rounded-lg
    fontFamily: "OldStandard-Regular",
  },
  actionButtonText: {
    color: ColorsBarber.dark.textColor,
    fontSize: 18, // Corresponds to text-lg
    fontWeight: "600", // Corresponds to font-semibold
    textAlign: "center",
    fontFamily: "OldStandard-Regular",
  },
  actionButtonTextNo: {
    color: ColorsBarber.dark.textColor,
    fontSize: 18, // Corresponds to text-lg
    fontWeight: "600", // Corresponds to font-semibold
    textAlign: "center",
    fontFamily: "OldStandard-Regular",
  },
});
