import { memo, useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import {
  cancelAnimation,
  Easing,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { StyleGuide } from "../../StyleGuide";
import { ChatBubble } from "./ChatBubble";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: StyleGuide.palette.background,
  },
});
export const ControlledLoopedAnimationDemo = memo(() => {
  const [play, setPlay] = useState(false);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000, easing: Easing.linear }),
        withTiming(0, { duration: 0 }),
      ),
      -1,
      false,
    );

    return () => {
      cancelAnimation(progress);
    };
  }, [progress]);

  return (
    <View style={styles.container}>
      <ChatBubble progress={progress} />
      <View style={{ marginBottom: 32 }}>
        <Button
          title={play ? "Pause" : "Play"}
          onPress={() => {
            setPlay((prev) => !prev);
          }}
        />
      </View>
    </View>
  );
});
