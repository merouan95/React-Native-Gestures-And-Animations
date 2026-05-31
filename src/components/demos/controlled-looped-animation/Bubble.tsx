import { StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";

import { memo } from "react";
import { StyleGuide } from "../../StyleGuide";

const BUBBLE_SIZE = 32;

const styles = StyleSheet.create({
  bubble: {
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE / 2,
    backgroundColor: StyleGuide.palette.primary,
  },
});

interface BubbleProps {
  progress: SharedValue<number>;
  start: number;
  end: number;
}

export const Bubble = memo(({ progress, start, end }: BubbleProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [start, end],
      [0.5, 1],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      progress.value,
      [start, end],
      [1, 1.5],
      Extrapolation.CLAMP,
    );
    return {
      opacity: opacity,
      transform: [{ scale }],
    };
  }, [progress, start, end]);

  return <Animated.View style={[styles.bubble, animatedStyle]} />;
});
