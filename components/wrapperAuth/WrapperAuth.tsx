import { ColorsBarber } from "@/constants/Colors";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";

function WrapperAuth({ children }) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          flex: 1,
          paddingVertical: 0,
          backgroundColor: ColorsBarber.light.background,
        }}
        keyboardShouldPersistTaps="always"
      >
        {/* <StatusBar backgroundColor=ColorsBarber.light.background barStyle="light-content" /> */}
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: ColorsBarber.light.background,
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
});

export default WrapperAuth;
