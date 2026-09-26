import { ColorsBarber } from "@/constants/Colors";
import { View, StyleSheet, Modal, ActivityIndicator } from "react-native";

export const SharedLoader = ({ isOpen, onConfirm }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={onConfirm}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <ActivityIndicator size={32} color={ColorsBarber.light.textColor} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.10)",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: ColorsBarber.light.background, // Corresponds to bg-gray-800
    borderRadius: 12,
    shadowColor: ColorsBarber.light.background,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
    padding: 32,
    maxWidth: 384,
    width: "100%",
    alignItems: "center",
  },

  iconContainer: {
    width: 96,
    height: 96,
    backgroundColor: ColorsBarber.light.item, // Corresponds to bg-blue-900 bg-opacity-30
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
});
