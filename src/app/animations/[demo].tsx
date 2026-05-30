import { PanGestureDemo } from "@/components/demos/pan-gesture";
import { PanGestureWithVelocityDemo } from "@/components/demos/pan-gesture-with-velocity";
import { TransitionsDemo } from "@/components/demos/transitions";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const DEMO_MAP: Record<string, React.ComponentType> = {
  "pan-gesture": PanGestureDemo,
  "pan-gesture-with-velocity": PanGestureWithVelocityDemo,
  transitions: TransitionsDemo,
};

export default function DemoScreen() {
  const { demo } = useLocalSearchParams<{ demo: string }>();
  const Demo = DEMO_MAP[demo];

  if (!Demo) {
    return (
      <View style={styles.center}>
        <Text>Demo "{demo}" not found.</Text>
      </View>
    );
  }

  return <Demo />;
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
