import { Image, View } from "react-native";
import { makeStyles } from "@/theme";
import { AppText, Icon, Pressable } from "@/components/ui";

const ProfileUserComponent = ({ data, onPress }) => {
  const styles = useStyles();
  return (
    <View style={styles.profileSection}>
      {/* no photo → nothing (B21, user decision D-022) */}
      {data?.image ? <Image source={{ uri: data?.image }} style={styles.profileImage} /> : null}
      <View style={styles.profileInfo}>
        <AppText variant="title" style={styles.profileName}>{data?.name}</AppText>
        <AppText>{data?.email}</AppText>
      </View>
      <Pressable style={styles.editButton} onPress={() => onPress("1")}>
        <Icon name="pencil" size={20} color="text" />
      </Pressable>
    </View>
  );
};
const useStyles = makeStyles((colors) => ({
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
    marginBottom: 2,
  },
  editButton: {
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
}));
export default ProfileUserComponent;
