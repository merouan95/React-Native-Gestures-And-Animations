import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";

const DEMOS = [
  {
    id: "pan-gesture",
    title: "Pan Gesture",
    description: "Drag a ball around",
  },
  {
    id: "transitions",
    title: "Transitions",
    description: "Enter/exit animations",
  },
];

export default function AnimationsCatalog() {
  return (
    <FlatList
      data={DEMOS}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/animations/[demo]",
              params: { demo: item.id, title: item.title },
            })
          }
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 12 },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 12,
  },
  title: { fontSize: 16, fontWeight: "700" },
  description: { fontSize: 13, color: "#666", marginTop: 4 },
});
