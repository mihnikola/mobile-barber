import { ComponentType } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function withSafeArea<T>(WrapperComponent: ComponentType<T>) {
  return function (props: T & JSX.IntrinsicAttributes) {
    const insets = useSafeAreaInsets();

    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? insets.top : null,
        }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <WrapperComponent {...props} />
      </View>
    );
  };
}
