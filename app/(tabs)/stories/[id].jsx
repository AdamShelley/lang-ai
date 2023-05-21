import { StyleSheet } from "react-native";
import { Redirect, Stack, useSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { data } from "../../../data";

const Story = () => {
  const { id } = useSearchParams();

  const story = data.find((story) => story.id === parseInt(id));

  if (!story) return <Redirect to="/" />;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: `Story: ${id}` }} />
      <View style={styles.wrapper}>
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.text}>{story.text}</Text>
      </View>
    </View>
  );
};

export default Story;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#474750",
    flexDirection: "column",
    alignItems: "center",
    padding: 24,
    height: "100%",
  },

  wrapper: {
    width: "80%",
    height: "100%",
  },

  title: {
    marginTop: 10,
    color: "#fff",
    fontSize: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 50,
  },
  text: {
    color: "#fff",
    marginTop: 10,
    fontSize: 25,
    lineHeight: 50,
    fontWeight: 300,
  },
});
