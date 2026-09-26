import { ColorsBarber } from "@/constants/Colors";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";

export const SharedMessage = ({
  isOpen,
  onClose,
  icon,
  title,
  buttonText,
  onConfirm,
  isLoading,
}) => {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={onConfirm}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>{icon}</View>

          <Text style={styles.modalTitle}>{title}</Text>
          <TouchableOpacity onPress={onConfirm} style={styles.actionButton} disabled={isLoading === "verification"}>
            {!isLoading && (
              <Text style={styles.actionButtonText}>{buttonText}</Text>
            )}
            {isLoading && (
              <ActivityIndicator
                size={25}
                color={isLoading === "verification" ? ColorsBarber.light.textColor : ColorsBarber.light.inActiveTextColor}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.70)",
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

  modalTitle: {
    color: ColorsBarber.light.textColor,
    fontSize: 16,
    fontFamily: "OldStandard-Bold",
    marginBottom: 16,
    textAlign: "center",
    lineHeight: 36,
  },
  actionButton: {
    width: "100%",
    backgroundColor: ColorsBarber.light.item,
    paddingVertical: 16,
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
