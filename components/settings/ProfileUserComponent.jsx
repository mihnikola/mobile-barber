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
        <AppText variant="bodySm">{data?.email}</AppText>
      </View>
      <Pressable style={styles.editButton} onPress={() => onPress("1")}>
        <Icon name="pencil" size={20} color="ink" />
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
    borderBottomColor: colors.line,
    marginBottom: 10,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 2,
    borderColor: colors.lineStrong,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    marginBottom: 2,
  },
  editButton: {
    backgroundColor: colors.bg,
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
}));
export default ProfileUserComponent;
