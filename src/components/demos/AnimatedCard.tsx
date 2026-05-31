import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
    type SharedValue,
} from "react-native-reanimated";

import type { Cards } from "../Card";
import { Card } from "../Card";
import { StyleGuide } from "../StyleGuide";

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    padding: StyleGuide.spacing * 4,
  },
});

type ReadableSharedValue<T> = Readonly<Pick<SharedValue<T>, "value">>;

interface AnimatedCardProps {
  transition: ReadableSharedValue<number>;
  index: number;
  card: Cards;
}

export const AnimatedCard = ({
  card,
  transition,
  index,
}: AnimatedCardProps) => {
  const { width } = useWindowDimensions();

  const origin = -(width / 2 - StyleGuide.spacing * 2);

  const animatedStyle = useAnimatedStyle(() => {
    const rotate =
      (index - 1) * interpolate(transition.value, [0, 1], [0, Math.PI / 6]);

    return {
      transform: [
        { translateX: origin },
        { rotate: `${rotate}rad` },
        { translateX: -origin },
      ],
    };
  });

  return (
    <Animated.View style={[styles.overlay, animatedStyle]}>
      <Card card={card} />
    </Animated.View>
  );
};
