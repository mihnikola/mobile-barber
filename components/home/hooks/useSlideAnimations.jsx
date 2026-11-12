// // /hooks/useSlideAnimations.js
// import { useEffect, useRef } from "react";
// import { Animated, Dimensions } from "react-native";

// const { height } = Dimensions.get("window");

// export function useSlideAnimations() {
//   const slideAnim = useRef(new Animated.Value(-height)).current;
//   const slideAnimBook = useRef(new Animated.Value(height * 5.1)).current;

//   useEffect(() => {
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();

//     Animated.timing(slideAnimBook, {
//       toValue: 0,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, [slideAnim, slideAnimBook]);

//   return { slideAnim, slideAnimBook };
// }

import { useRef, useEffect } from "react";
import { Animated, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

// Singleton values to persist across remounts (created once at module load)
const slideAnimGlobal = new Animated.Value(-height);
const slideAnimBookGlobal = new Animated.Value(height * 5.1);

export function usePersistentSlideAnimations() {
  const slideAnim = slideAnimGlobal;
  const slideAnimBook = slideAnimBookGlobal;

  // run animation only once
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideAnimBook, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    hasAnimated.current = true;
  }, [slideAnim, slideAnimBook]);

  return { slideAnim, slideAnimBook };
}
