import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

interface SuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isVisible, onClose }) => {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose} // Handle closing on Android back press
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Success message */}
          <IconSymbol size={50} name="check.cirle" color="black" />

          <Text style={styles.successMessage}>Rezervacija je uspešno poslata!</Text>

          {/* Close button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>U redu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Styles
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(84, 84, 84, 0.95)", // Semi-transparent overlay
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    gap:20,
    alignItems: "center",
    justifyContent: "center",
  },
  successMessage: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SuccessModal;
