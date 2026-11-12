import { ColorsBarber } from "@/constants/Colors";
import { TouchableOpacity } from "@/shared-components/TouchableOpacity";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { colors, fonts } from "@/theme";

const LoginRedirect = ({ onPress, title }) => {
  return (
    <View style={styles.profileSection}>
      <View style={styles.profileInfoIcon}>
        <Ionicons
          name="person-circle-sharp"
          size={30}
          color={ColorsBarber.dark.inActiveTextColor}
        />
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
    color: ColorsBarber.dark.textColor,
  },
});
export default LoginRedirect;
