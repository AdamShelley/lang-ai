import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Card = ({ story, handleStory }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleStory(story.id)}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: story.image }}
          style={styles.image}
          alt="story-image"
        />
        <View style={styles.bottomSection}>
          <Text style={styles.level}>{story.level}</Text>
          <Text style={styles.text}>{story.title}</Text>
          <Text style={styles.smallText}>{story.tease}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#474750",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    padding: 0,
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
  level: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#212121",
    color: "#fff",
    alignSelf: "flex-start",
    fontSize: 10,
  },
  image: {
    width: 200,
    height: 150,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    resizeMode: "cover",
  },
  bottomSection: {
    marginTop: 5,
    padding: 10,
  },
  smallText: {
    fontSize: 10,
    color: "#fff",
    marginTop: 10,
    marginBottom: 20,
  },
});
