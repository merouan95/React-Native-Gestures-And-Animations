import { memo } from "react";
import { StyleSheet, View } from "react-native";
import {
    ComposedGesture,
    Gesture,
    GestureDetector,
    GestureType,
} from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";

const AnimationsScreen = memo(() => {
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pan: ComposedGesture | GestureType = Gesture.Pan()
    .onBegin(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
      translateY.value = startY.value + event.translationY;
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
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.ball, animatedStyle]} />
      </GestureDetector>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ball: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "#30B566",
  },
});
export default AnimationsScreen;
