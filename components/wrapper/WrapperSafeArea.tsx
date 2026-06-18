// import { ComponentType } from "react";
// import { StatusBar, StyleSheet } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function withSafeArea<T>(WrapperComponent: ComponentType<T>) {
//   return function (props: T & JSX.IntrinsicAttributes) {

//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <StatusBar
//           barStyle="dark-content"
//           backgroundColor="transparent"
//           translucent
//         />
//         <WrapperComponent {...props} />
//       </SafeAreaView>
//     );
//   };
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#000",
//   },
// });

import { ComponentType } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function withSafeArea<T>(WrapperComponent: ComponentType<T>) {
  return function (props: T & JSX.IntrinsicAttributes) {
    const insets = useSafeAreaInsets();

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
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
