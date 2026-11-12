import { StyleSheet, Text, View } from "react-native";
import { getInitialsName } from "@/helpers";
import { ColorsBarber } from "@/constants/Colors";
import { colors, fonts } from "@/theme";

const SharedImageInitials = ({
  name,
  profile = false,
  otherServices,
  listEmployers,
}) => {
  const initials = getInitialsName(name);
  if (listEmployers) {
    return (
      <View style={[styles.avatarContainer, profile && styles.profile]}>
        <Text style={[styles.avatarText, profile && styles.profileText]}>
          {initials}
        </Text>
      </View>
    );
  }
  if (otherServices?.length === 0) {
    return (
      <View style={[styles.avatarContainer, profile && styles.profile]}>
        <Text style={[styles.avatarText, profile && styles.profileText]}>
          {initials}
        </Text>
      </View>
    );
  }
  if (otherServices?.length > 0) {
    return (
      <View style={styles.profileOtherComponent}>
        <Text style={styles.profileTextOther}>{initials}</Text>
      </View>
    );
  }
};

export default SharedImageInitials;

const styles = StyleSheet.create({
  profileText: {
    color: ColorsBarber.dark.textColor,
    fontFamily: fonts.bold,
    fontSize: 20,
    alignSelf: "center",
  },
  profileTextOther: {
    color: ColorsBarber.dark.textColor,
    fontFamily: fonts.bold,
    fontSize: 14,
    alignSelf: "center",
  },
  profile: {
    width: 70,
    height: 70,
  },
  profileOtherComponent: {
    width: 40,
    height: 40,
    borderRadius: 15,
    marginRight: 15,
    backgroundColor: colors.surfaceAvatar,
    borderWidth: 1,
    borderColor: colors.borderAvatar,
    justifyContent: "center",
  },

  avatarContainer: {
    backgroundColor: colors.surfaceAvatar,
    width: 90,
    height: 90,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: colors.borderAvatar,
    justifyContent: "center",
  },
  avatarText: {
    color: ColorsBarber.dark.textColor,
    fontFamily: fonts.bold,
    fontSize: 30,
    alignSelf: "center",
  },
});
