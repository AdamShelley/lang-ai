import { Image, StyleSheet } from "react-native";
import { Redirect, Stack, useSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { data } from "../../../../data";
import { FONT } from "../../../../constants/fonts";

const Story = () => {
  const { id } = useSearchParams();

  const story = data.find((story) => story.id === parseInt(id));

  if (!story) return <Redirect to="/" />;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: story.image }}
        style={styles.image}
        alt="story-image"
      />
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
    backgroundColor: "#212124",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    position: "absolute",
    opacity: 0.2,
  },
  wrapper: {
    width: "80%",
    height: "100%",
    padding: 20,
  },

  title: {
    marginTop: 10,
    color: "#fff",
    fontSize: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 50,
    fontFamily: FONT.medium,
  },
  text: {
    color: "#fff",
    marginTop: 10,
    fontSize: 25,
    lineHeight: 80,
    fontWeight: 300,
  },
});
