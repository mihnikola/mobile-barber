import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";

const ProfileUserComponent = ({ data, onPress }) => {
  return (
    <View style={styles.profileSection}>
      <Image source={{ uri: data?.image }} style={styles.profileImage} />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{data?.name}</Text>
        <Text style={styles.profileEmail}>{data?.email}</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={() => onPress("1")}>
        <MaterialCommunityIcons name="pencil" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    marginBottom: 10,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#4a4a4a",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: "#B0B0B0",
  },
  editButton: {
    backgroundColor: "black",
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ProfileUserComponent;
