import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

export const SharedMessage = ({ isOpen, onClose, icon, title, buttonText }) => {
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
          <TouchableOpacity onPress={onClose} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#374151", 
    borderRadius: 12, 
    shadowColor: "#000",
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
    backgroundColor: "#2596be",
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24, 
    borderWidth: 2,
    borderColor: "#2563EB",
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 16,
    textAlign: "center",
    lineHeight: 36,
  },
  actionButton: {
    width: "100%", 
    backgroundColor: "#2596be",
    paddingVertical: 16, 
    borderRadius: 8, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 22, 
    fontWeight: "600", 
    textAlign: "center",
  },
});
