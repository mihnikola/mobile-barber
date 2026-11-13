import { TouchableOpacity } from "@/shared-components/TouchableOpacity";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { colors, fonts } from "@/theme";
import { Icon } from "@/components/ui";

const LoginRedirect = ({ onPress, title }) => {
  return (
    <View style={styles.profileSection}>
      <View style={styles.profileInfoIcon}>
        <Icon name="personCircle" size={30} color="textInactive" />
      </View>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.profileName}>{title}</Text>
      </TouchableOpacity>
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
  profileName: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.text,
  },
});
export default LoginRedirect;
