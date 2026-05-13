import { StyleSheet, Text, View } from "react-native";
import { getInitialsName } from "@/helpers";

const SharedImageInitials = ({ name, profile = false }) => {
  const initials = getInitialsName(name);
  return (
    <View style={[styles.avatarContainer, profile && styles.profile]}>
      <Text style={[styles.avatarText, profile && styles.profileText]}>
        {initials}
      </Text>
    </View>
  );
};

export default SharedImageInitials;

const styles = StyleSheet.create({
  profileText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
  },
  profile: {
    width: 70,
    height: 70,
  },
  avatarContainer: {
    backgroundColor: "#242424",
    width: 90,
    height: 90,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#cccccc",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    alignSelf: "center",
  },
});
