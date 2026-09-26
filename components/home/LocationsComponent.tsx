import { ColorsBarber } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
          <ScrollView style={{ maxHeight: 300 }}>
          {locations?.map((locationItem: any) => {
            return (
              <TouchableOpacity
                key={locationItem.id}
                style={styles.item}
                onPress={() => handleLocationSelect(locationItem)}
              >
                <FontAwesome6 name="location-dot" size={20} color={ColorsBarber.light.textColor} />
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
          </ScrollView>
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
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: ColorsBarber.light.background,

    borderRadius: 12,
    shadowColor: ColorsBarber.light.background,
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
    flex:2,
    fontSize: 16,
   color: ColorsBarber.light.textColor,
  },

  modalTitle: {
    color: ColorsBarber.light.textColor,
    fontSize: 22,
    fontFamily: "OldStandard-Bold",
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 10,
  },
  actionButton: {
    width: "100%",
    backgroundColor: ColorsBarber.light.item,
    paddingVertical: 16,
    marginTop: 20,
    borderRadius: 8,
    shadowColor: ColorsBarber.light.background,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    color: ColorsBarber.light.textColor,
    fontSize: 22,
    fontFamily: "OldStandard-Regular",
    textAlign: "center",
  },
});

export default LocationsComponent;
