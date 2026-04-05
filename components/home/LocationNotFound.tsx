import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
    backgroundColor: "rgba(0, 0, 0, 0.98)",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#433d3c",
    borderRadius: 12,
    shadowColor: "#000",
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
    color: "white",
  },

  modalTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 10,
  },
  actionButton: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 16,
    marginTop: 20,
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

export default LocationNotFound;
