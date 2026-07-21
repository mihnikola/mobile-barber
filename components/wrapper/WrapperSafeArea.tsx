import { ComponentType } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function withSafeArea<T>(WrapperComponent: ComponentType<T>) {
  return function (props: T & JSX.IntrinsicAttributes) {
    const insets = useSafeAreaInsets();

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <View style={[styles.headerSafeArea, { height: insets.top }]} />

        <WrapperComponent {...props} />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  headerSafeArea: {
    backgroundColor: "#000",
  },
});
