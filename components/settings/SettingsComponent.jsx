import { View, StyleSheet, StatusBar } from "react-native";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { FontAwesome } from "@expo/vector-icons";
import MenuItemContainer from "./MenuItemContainer";
import ProfileUserComponent from "./ProfileUserComponent";
import SettingsHeaderTitle from "./SettingsHeaderTitle";
import { useAuth } from "@/context/AuthContext";

const SettingsComponent = () => {
  const { logoutFirebase, onPressHandler, isMessage, setIsMessage, userData } = useAuth();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="black" />

      <SettingsHeaderTitle capture="My Profile" />

      <ProfileUserComponent data={userData} onPress={onPressHandler} />

      <MenuItemContainer onPress={onPressHandler} />

      {isMessage && (
        <SharedQuestion
          isOpen={isMessage}
          onClose={() => setIsMessage(false)}
          onLogOut={logoutFirebase}
          icon={
            <FontAwesome
              name="question-circle-o"
              size={64}
              color="white"
            />
          }
          title="Are you sure you want to sign out from application?" 
          buttonTextYes="Leave"
          buttonTextNo="Cancel"
        />
      )}
    </View>
  );
};

export default SettingsComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
