import { useEffect, useRef } from "react";
import {
  type GestureResponderEvent,
  TouchableOpacity as RNTouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

/** Ignore repeated taps for this long after a press (prevents double submits / double navigation). */
export const PRESS_LOCK_MS = 500;

export type PressableProps = TouchableOpacityProps;

/**
 * TouchableOpacity with a press lock (D-006): a second tap within PRESS_LOCK_MS is ignored.
 * Use this instead of react-native's TouchableOpacity everywhere.
 */
export function Pressable({ onPress, ...rest }: PressableProps) {
  const lockedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handlePress = (event: GestureResponderEvent) => {
    if (lockedRef.current) {
      return;
    }

    lockedRef.current = true;
    onPress?.(event);

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      lockedRef.current = false;
    }, PRESS_LOCK_MS);
  };

  return <RNTouchableOpacity {...rest} onPress={handlePress} />;
}
