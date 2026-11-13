import {
  Modal,
  ScrollView,
  View,
} from "react-native";
import { makeStyles } from "@/theme";
import { AppText, Icon, Pressable } from "@/components/ui";

function LocationsComponent({
  locations,
  modalVisible,
  setModalVisible,
  handleLocationSelect,
  title,
  buttonText,
}) {
  const styles = useStyles();
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
          <AppText variant="legacyHeading" style={styles.modalTitle}>{title}</AppText>
          <ScrollView style={{ maxHeight: 300 }}>
            {locations?.map((locationItem: any) => {
              return (
                <Pressable
                  key={locationItem.id}
                  style={styles.item}
                  onPress={() => handleLocationSelect(locationItem)}
                >
                  <Icon name="locationDot" size={20} color="danger" />
                  <AppText variant="legacyLabel"
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.itemSubtitle}
                  >
                    {locationItem.address}
                  </AppText>
                </Pressable>
              );
            })}
          </ScrollView>
          <Pressable onPress={onConfirm} style={styles.actionButton}>
            <AppText variant="legacyBody" size={22} style={styles.actionButtonText}>{buttonText}</AppText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
const useStyles = makeStyles((colors) => ({
  overlay: {
    flex: 1,
    backgroundColor: colors.scrim,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 12,
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
  },

  modalTitle: {
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 10,
  },
  actionButton: {
    width: "100%",
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 16,
    marginTop: 20,
    borderRadius: 8,
    shadowColor: colors.bg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    textAlign: "center",
  },
}));

export default LocationsComponent;
