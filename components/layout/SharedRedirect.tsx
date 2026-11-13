import { StyleSheet, View } from "react-native";
import React from "react";
import { AppText, Pressable } from "@/components/ui";

/** "Question? Link" line under auth forms (e.g. "Nemaš nalog? Registruj se"). */
const SharedRedirect = (props: any) => {
  return (
    <View style={styles.row}>
      <AppText variant="bodySm" color="inkMuted">
        {props.question}{" "}
      </AppText>
      <Pressable onPress={props.onPress} hitSlop={8}>
        <AppText variant="bodySm" bold style={styles.link}>
          {props.text}
        </AppText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "center", alignItems: "center", flexWrap: "wrap" },
  link: { textDecorationLine: "underline" },
});

export default SharedRedirect;
