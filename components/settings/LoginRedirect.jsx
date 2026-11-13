import { View } from "react-native";
import { makeStyles } from "@/theme";
import { AppText, Icon, Pressable } from "@/components/ui";

const LoginRedirect = ({ onPress, title }) => {
  const styles = useStyles();
  return (
    <View style={styles.profileSection}>
      <View style={styles.profileInfoIcon}>
        <Icon name="personCircle" size={30} color="inkMuted" />
      </View>
      <Pressable onPress={onPress}>
        <AppText variant="legacySubtitle">{title}</AppText>
      </Pressable>
    </View>
  );
};

const useStyles = makeStyles((colors) => ({
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  profileInfoIcon: {
    paddingHorizontal: 15,
  },
}));
export default LoginRedirect;
