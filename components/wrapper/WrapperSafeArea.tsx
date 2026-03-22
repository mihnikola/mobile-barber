import { ComponentType } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function withSafeArea<T>(WrapperComponent: ComponentType<T>) {
  return function (props: T & JSX.IntrinsicAttributes) {
    const insets = useSafeAreaInsets();

    return (
      <SafeAreaView  style={[styles.safeArea,  { paddingTop: insets.top > 20 ? insets.top - 10 : insets.top },]}>
        <WrapperComponent {...props} />
      </SafeAreaView>
    );
  };
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
