import { Image, View } from "react-native";
import { makeStyles } from "@/theme";
import { AppText, Icon, Pressable } from "@/components/ui";

const ProfileUserComponent = ({ data, onPress }) => {
  const styles = useStyles();
  return (
    <View style={styles.profile}>
      {/* no photo → nothing (B21, user decision D-022) */}
      {data?.image ? <Image source={{ uri: data?.image }} style={styles.photo} /> : null}
      <View style={styles.info}>
        <AppText variant="displayMd" style={styles.name}>
          {data?.name}
        </AppText>
        <AppText variant="bodySm" color="inkMuted">
          {data?.email}
        </AppText>
      </View>
      <Pressable style={styles.edit} onPress={() => onPress("1")} hitSlop={8}>
        <Icon name="pencil" size="sm" />
      </Pressable>
    </View>
  );
};

const useStyles = makeStyles((colors) => ({
  profile: { flexDirection: "row", alignItems: "center", gap: 16, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  photo: { width: 72, height: 72, borderRadius: 12 },
  info: { flex: 1 },
  name: { fontSize: 24, lineHeight: 28 },
  edit: {
    width: 40,
    height: 40,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: colors.lineStrong,
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default ProfileUserComponent;
