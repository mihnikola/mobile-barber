import { ColorsBarber } from "@/constants/Colors";
import SharedImageInitials from "@/shared-components/SharedInitialsName";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";

const ProfileUserComponent = ({ data, onPress }) => {
  return (
    <View style={styles.profileSection}>
      {data?.image ? (
        <Image source={{ uri: data?.image }} style={styles.profileImage} />
      ) : (
        <SharedImageInitials name={data?.name} profile />
      )}
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{data?.name}</Text>
        <Text style={styles.profileEmail}>{data?.email}</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={() => onPress("1")}>
        <MaterialCommunityIcons
          name="pencil"
          size={20}
          color={ColorsBarber.light.textColor}
        />
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
    fontFamily: "OldStandard-Bold",
    color: ColorsBarber.light.textColor,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: "OldStandard-Regular",
    color: ColorsBarber.light.textColor,
  },
  editButton: {
    backgroundColor: ColorsBarber.light.background,
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ProfileUserComponent;
