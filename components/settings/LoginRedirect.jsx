import { StyleSheet } from "react-native";
import { View } from "react-native";
import { colors } from "@/theme";
import { AppText, Icon, Pressable } from "@/components/ui";

const LoginRedirect = ({ onPress, title }) => {
  return (
    <View style={styles.profileSection}>
      <View style={styles.profileInfoIcon}>
        <Icon name="personCircle" size={30} color="textInactive" />
      </View>
      <Pressable onPress={onPress}>
        <AppText variant="subtitle">{title}</AppText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  profileInfoIcon: {
    paddingHorizontal: 15,
  },
});
export default LoginRedirect;
