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
  container: {
    flex: 1, // Takes up the whole screen
    backgroundColor: "#1F2937", // Corresponds to bg-gray-900
    alignItems: "center", // Centers content horizontally
    justifyContent: "center", // Centers content vertically
    padding: 16,
  },
  openButton: {
    paddingHorizontal: 24, // Corresponds to px-6
    paddingVertical: 12, // Corresponds to py-3
    backgroundColor: "#2563EB", // Corresponds to bg-blue-600
    borderRadius: 8, // Corresponds to rounded-lg
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, // For Android shadow
  },
  openButtonText: {
    color: "#FFFFFF", // Corresponds to text-white
    fontSize: 16,
    fontWeight: "600", // Corresponds to font-semibold
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)", // Corresponds to bg-black bg-opacity-75
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#374151", // Corresponds to bg-gray-800
    borderRadius: 12, // Corresponds to rounded-xl
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15, // For Android shadow
    padding: 32, // Corresponds to p-8
    maxWidth: 384, // Corresponds to max-w-sm
    width: "100%", // Corresponds to w-full
    alignItems: "center", // Centers text and icon
  },
  iconContainer: {
    width: 96, // Corresponds to w-24
    height: 96, // Corresponds to h-24
    backgroundColor: "#2596be", // Corresponds to bg-blue-900 bg-opacity-30
    borderRadius: 9999, // Corresponds to rounded-full
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24, // Corresponds to mb-6
    borderWidth: 2,
    borderColor: "#2563EB", // Corresponds to border-blue-600
  },
  modalTitle: {
    color: "#FFFFFF", // Corresponds to text-white
    fontSize: 16, // Corresponds to text-3xl
    fontWeight: "bold", // Corresponds to font-bold
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
    width: "100%", // Corresponds to w-full
    backgroundColor: "#2596be", // Corresponds to bg-blue-600
    paddingVertical: 16, // Corresponds to py-4
    borderRadius: 8, // Corresponds to rounded-lg
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  actionButtonText: {
    color: "#FFFFFF", // Corresponds to text-white
    fontSize: 22, // Corresponds to text-lg
    fontWeight: "600", // Corresponds to font-semibold
    textAlign: "center",
  },
});
