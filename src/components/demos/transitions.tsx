import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { useDerivedValue, withSpring } from "react-native-reanimated";

import { cards } from "../Card";
import { StyleGuide } from "../StyleGuide";
import { AnimatedCard } from "./AnimatedCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "flex-end",
  },
});

export const TransitionsDemo = () => {
  const [toggled, setToggled] = useState(false);

  const transition = useDerivedValue(() => {
    return withSpring(toggled ? 1 : 0);
  }, [toggled]);

  return (
    <View style={styles.container}>
      {cards.slice(0, 3).map((card, index) => (
        <AnimatedCard
          key={card}
          index={index}
          card={card}
          transition={transition}
        />
      ))}

      <Button
        title={toggled ? "Reset" : "Start"}
        onPress={() => setToggled((prev) => !prev)}
      />
    </View>
  );
};
