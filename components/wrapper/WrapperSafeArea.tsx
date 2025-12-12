import { ComponentType } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function withSafeArea<T>(
  WrapperComponent: ComponentType<T>
) {
  return function (props: T & JSX.IntrinsicAttributes) {
    return (
      <SafeAreaView style={styles.safeArea}>
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
