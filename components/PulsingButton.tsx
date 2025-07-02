import { ReactElement, useEffect } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { theme } from "./theme";

export interface PulsingButtonProps {
  accessibilityHint?: string;
  accessibilityLabel?: string;
  Icon?: ReactElement;
  isDisabled?: boolean;
  isLoading?: boolean;
  onPress: () => void;
  title: string;
}

export interface PulseProps {
  index: number;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const BACKGROUND_TRANSITION_DURATION = 20;
const BORDER_RADIUS = 8;
const HEIGHT = 42;
const NUMBER_OF_PULSES = 2;
const PULSE_TRANSITION_DURATION = 2000;
const PULSE_DELAY = 200;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: BORDER_RADIUS,
    flexDirection: "row",
    gap: 22,
    // height: HEIGHT,
    justifyContent: "center",
    paddingHorizontal: 70,
  },
  pulse: {
    backgroundColor: "white",
    borderRadius: BORDER_RADIUS,
    height: HEIGHT,
    position: "absolute",
    width: "100%",
  },
  title: {
    color: "gray",
    display: "flex",
    alignItems: "center",
    fontSize: 24,
    fontStyle: "italic",
    fontWeight: "600",
  },
});

const Pulse = ({ index, isDisabled, isLoading }: PulseProps) => {
  const transition = useSharedValue(0);

  useEffect(() => {
    if (isDisabled || isLoading) {
      cancelAnimation(transition);
      transition.value = 0;
      return;
    }

    transition.value = withRepeat(
      withSequence(
        withDelay(
          PULSE_DELAY * index,
          withTiming(1, {
            duration:
              PULSE_TRANSITION_DURATION +
              PULSE_DELAY * (NUMBER_OF_PULSES - index - 1),
            easing: Easing.out(Easing.ease),
          })
        ),
        withTiming(0, { duration: 0 })
      ),
      -1
    );

    setTimeout(() => {
      cancelAnimation(transition);
      transition.value = 0;
    }, 6000);

    return () => {
      cancelAnimation(transition);
    };
  }, [index, isDisabled, isLoading, transition]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(transition.value, [0, 1], [0.5, 0]),
    transform: [
      {
        scale: interpolate(transition.value, [0, 1], [1, 1.5]),
      },
    ],
  }));

  return <Animated.View style={[styles.pulse, animatedStyle]} />;
};

export const PulsingButton = ({
  accessibilityHint,
  accessibilityLabel,
  Icon,
  isDisabled = false,
  isLoading = false,
  onPress,
  title,
}: PulsingButtonProps) => {
  const backgroundTransition = useSharedValue(0);
  const isActive = useSharedValue(false);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      backgroundTransition.value,
      [0, 1],
      [theme.colors.primary, theme.colors.primaryActive]
    ),
  }));

  return (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{
        busy: isLoading,
        disabled: isDisabled || isLoading,
      }}
      disabled={isDisabled || isLoading}
      hitSlop={16}
      onPress={onPress}
      onPressIn={() => {
        isActive.value = true;
        backgroundTransition.value = withTiming(
          1,
          { duration: BACKGROUND_TRANSITION_DURATION },
          () => {
            if (!isActive.value) {
              backgroundTransition.value = withTiming(0, {
                duration: BACKGROUND_TRANSITION_DURATION,
              });
            }
          }
        );
      }}
      onPressOut={() => {
        if (backgroundTransition.value === 1) {
          backgroundTransition.value = withTiming(0, {
            duration: BACKGROUND_TRANSITION_DURATION,
          });
        }
        isActive.value = false;
      }}
    >
      {Array.from({ length: NUMBER_OF_PULSES }).map((_, index) => (
        <Pulse
          key={index}
          index={index}
          isDisabled={isDisabled}
          isLoading={isLoading}
        />
      ))}
      <Animated.View
        style={[
          styles.container,
          animatedContainerStyle,
          { opacity: isDisabled ? 0.5 : 1 },
        ]}
      >
        {isLoading ? (
          <ActivityIndicator color="black" size={18} />
        ) : (
          <>
            {Icon}
            <Text style={styles.title}>{title}</Text>
          </>
        )}
      </Animated.View>
    </Pressable>
  );
};
