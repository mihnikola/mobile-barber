import SharedImageInitials from "@/shared-components/SharedInitialsName";
import { TouchableOpacity } from "@/shared-components/TouchableOpacity";
import { StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";
import { colors, fonts } from "@/theme";
import { Icon } from "@/components/ui";

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
        <Icon name="pencil" size={20} color="text" />
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
    borderBottomColor: colors.divider,
    marginBottom: 10,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 2,
    borderColor: colors.borderIcon,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.text,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.text,
  },
  editButton: {
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ProfileUserComponent;
