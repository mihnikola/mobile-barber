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
          <TouchableOpacity
            onPress={onConfirm}
            style={styles.actionButton}
            disabled={isLoading === "verification"}
          >
            {!isLoading && (
              <Text style={styles.actionButtonText}>{buttonText}</Text>
            )}
            {isLoading && (
              <ActivityIndicator
                size={25}
                color={
                  isLoading === "verification"
                    ? ColorsBarber.dark.textColor
                    : ColorsBarber.dark.inActiveTextColor
                }
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
    backgroundColor: "rgba(0, 0, 0, 0.88)",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: ColorsBarber.dark.backgroundModal,
    borderRadius: 12,
    padding: 32,
    maxWidth: 384,
    width: "100%",
    alignItems: "center",
  },

  iconContainer: {
    width: 96,
    height: 96,
    backgroundColor: ColorsBarber.dark.background, // Corresponds to bg-blue-900 bg-opacity-30
    borderWidth: 1,
    borderColor: ColorsBarber.dark.borderColor,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  modalTitle: {
    color: ColorsBarber.dark.textColor,
    fontSize: 16,
    fontFamily: "OldStandard-Bold",
    marginBottom: 16,
    textAlign: "center",
    lineHeight: 36,
  },
  actionButton: {
    width: "100%",
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
  actionButtonText: {
    color: ColorsBarber.dark.textColor,
    fontSize: 22,
    fontFamily: "OldStandard-Regular",
    textAlign: "center",
  },
});
