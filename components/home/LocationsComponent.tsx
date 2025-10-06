import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function LocationsComponent({
  locations,
  modalVisible,
  setModalVisible,
  handleLocationSelect,
  title,
  buttonText,
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
            {locations?.map((locationItem: any) => {
              return (
                <TouchableOpacity
                  key={locationItem.id}
                  style={styles.item}
                  onPress={() => handleLocationSelect(locationItem)}
                >
                  <FontAwesome6 name="location-dot" size={20} color="red" />
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.itemSubtitle}
                  >
                    {locationItem.address}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
    maxHeight: "63%",
  },
  item: {
    paddingTop: 10,
    gap: 10,
    flexWrap: "wrap",
  },
  itemSubtitle: {
    flex: 1,
    width: "100%",
    fontSize: 16,
    color: "white",
  },

  modalTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
    lineHeight: 36,
  },
  actionButton: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 16,
    marginVertical: 10,
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

export default LocationsComponent;
