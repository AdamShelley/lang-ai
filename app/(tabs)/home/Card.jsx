import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FONT } from "../../../constants/fonts";

const Card = ({ story, handleStory, width, wide = false }) => {
  return (
    <TouchableOpacity
      style={styles.container(width, wide)}
      onPress={() => handleStory(story.id)}
    >
      <View style={styles.imageContainer(wide)}>
        <View style={{ alignSelf: "stretch" }}>
          <Image
            source={{ uri: story.image }}
            style={styles.image(wide)}
            alt="story-image"
          />
          <View style={styles.overlay} />
          {wide && <Text style={styles.level(wide)}>{story.level}</Text>}
        </View>
      </View>
      <View style={styles.bottomSection(wide)}>
        {!wide && <Text style={styles.level(wide)}>{story.level}</Text>}
        <Text style={styles.text(wide)}>{story.title}</Text>

        {wide && <Text style={styles.smallText}>{story.tease}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: (width, wide) => ({
    backgroundColor: "#323232",
    flexDirection: wide ? "row" : "column",
    alignItems: wide ? "flex-start" : "center",
    justifyContent: wide ? "flex-start" : "center",
    width: width ? width : 200,
    height: wide ? 100 : 200,
    padding: 0,
    borderRadius: 6,
    marginTop: 15,
    shadowColor: "#262626",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  }),
  imageContainer: (wide) => ({
    // flex: 1,
    width: wide ? "30%" : "100%", // Smaller container if wide card
    minWidth: 10,
    height: wide ? "100%" : "70%",
    borderTopRightRadius: wide ? 0 : 6,
    borderTopLeftRadius: 6,
    overflow: "hidden",
    position: "relative",
  }),

  image: (wide) => ({
    height: "100%",
    borderTopRightRadius: wide ? 0 : 6,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: wide ? 6 : 0,
    resizeMode: "cover",
  }),
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  bottomSection: (wide) => ({
    height: wide ? "100%" : "30%",
    padding: 10,
    flexDirection: wide ? "column" : "row",
    alignItems: wide ? "flex-start" : "center",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    overflow: "hidden",
    marginLeft: 10,
  }),
  text: (wide) => ({
    color: "#fff",
    fontSize: 16,
    fontWeight: 400,
    paddingHorizontal: wide ? 0 : 10,
    fontFamily: FONT.medium,
  }),
  level: (wide) => ({
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#262626",
    padding: 6,
    backgroundColor: "#262626",
    color: "#fff",
    fontSize: 10,
    position: wide ? "absolute" : "relative",
    left: wide ? 35 : null,
    bottom: wide ? 4 : null,
    fontFamily: FONT.light,
  }),
  smallText: {
    fontSize: 14,
    color: "#fff",
    marginTop: 20,
    fontFamily: FONT.regular,
  },
});
