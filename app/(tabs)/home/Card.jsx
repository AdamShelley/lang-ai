import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Card = ({ story, handleStory, width }) => {
  return (
    <TouchableOpacity
      style={styles.container(width)}
      onPress={() => handleStory(story.id)}
    >
      <View style={styles.imageContainer}>
        <View style={{ alignSelf: "stretch" }}>
          <Image
            source={{ uri: story.image }}
            style={styles.image}
            alt="story-image"
          />
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.level}>{story.level}</Text>
        <Text style={styles.text}>{story.title}</Text>
        {/* <Text style={styles.smallText}>{story.tease}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: (width) => ({
    backgroundColor: "#323232",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: width ? width : 200,
    height: 200,
    padding: 0,
    borderRadius: 6,
    marginTop: 10,
  }),
  imageContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "70%",
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    overflow: "hidden",
  },

  image: {
    height: "100%",
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    resizeMode: "cover",
  },
  bottomSection: {
    height: "30%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    overflow: "hidden",
    // flex: 1,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 400,
    paddingHorizontal: 10,
  },
  level: {
    borderRadius: 10,
    padding: 8,
    backgroundColor: "#464646",
    color: "#fff",
    fontSize: 10,
  },
  smallText: {
    fontSize: 10,
    color: "#fff",
    marginTop: 10,
    marginBottom: 10,
  },
});
