import { memo } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import { Bubble } from "./Bubble";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  MessengerBubbleContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#d3d3d3",
  },
});

interface ChatBubbleProps {
  progress: SharedValue<number>;
}

export const ChatBubble = memo(({ progress }: ChatBubbleProps) => {
  // Messenger Buble Container Size
  const { width } = useWindowDimensions();
  const bubbleWidth = width * 0.8;

  //
  const bubbles = [0, 1, 2];
  const delta = 1 / bubbles.length;
  //

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.MessengerBubbleContainer,
          {
            height: bubbleWidth,
            width: bubbleWidth,
            borderTopLeftRadius: bubbleWidth / 2,
            borderTopRightRadius: bubbleWidth / 2,
            borderBottomLeftRadius: bubbleWidth / 2,
          },
        ]}
      >
        {bubbles.map((i) => {
          const start = i * delta;
          const end = start + delta;
          return <Bubble key={i} {...{ start, end, progress }} />;
        })}
      </View>
    </View>
  );
});
