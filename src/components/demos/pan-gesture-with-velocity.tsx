import { memo, useState } from "react";
import { Dimensions, LayoutChangeEvent, StyleSheet, View } from "react-native";
import {
    ComposedGesture,
    Gesture,
    GestureDetector,
    GestureType,
} from "react-native-gesture-handler";
import Animated, {
    cancelAnimation,
    clamp,
    useAnimatedStyle,
    useSharedValue,
    withDecay,
} from "react-native-reanimated";

const ballDiameter = 80;
const windowWidth = Dimensions.get("window").width;

export const PanGestureWithVelocityDemo = memo(() => {
  const [containerHeight, setContainerHeight] = useState(0);

  const translationMaximalSurAxeX = windowWidth - ballDiameter;
  const translationMaximalSurAxeY = containerHeight - ballDiameter;

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pan: ComposedGesture | GestureType = Gesture.Pan()
    .onStart(() => {
      cancelAnimation(translateX);
      cancelAnimation(translateY);

      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateX.value = clamp(
        startX.value + event.translationX,
        0,
        translationMaximalSurAxeX,
      );
      translateY.value = clamp(
        startY.value + event.translationY,
        0,
        translationMaximalSurAxeY,
      );
    })
    .onEnd((event, success) => {
      if (!success) return;

      translateX.value = withDecay({
        velocity: event.velocityX,
        clamp: [0, translationMaximalSurAxeX],
      });

      translateY.value = withDecay({
        velocity: event.velocityY,
        clamp: [0, translationMaximalSurAxeY],
      });
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <View
      style={styles.container}
      onLayout={(event: LayoutChangeEvent) => {
        setContainerHeight(event.nativeEvent.layout.height);
      }}
    >
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.ball, animatedStyle]} />
      </GestureDetector>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  ball: {
    height: ballDiameter,
    width: ballDiameter,
    borderRadius: ballDiameter / 2,
    backgroundColor: "#30B566",
  },
});
