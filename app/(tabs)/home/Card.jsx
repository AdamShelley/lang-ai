import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FONT } from "../../../constants/fonts";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import useSettingsStore from "../../../state/store";

const Card = ({ story, width, wide = false }) => {
  const router = useRouter();
  const haptics = useSettingsStore((state) => state.haptics);
  const [imageUrl, setImageUrl] = useState(story?.imageUrl);

  const handlePress = (id) => {
    // haptics && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    router.push(`/story/${id}`);
  };

  return (
    <TouchableOpacity
      style={styles.container(width, wide)}
      onPress={() => handlePress(story.gptId)}
    >
      <View style={styles.imageContainer(wide)}>
        <View style={{ alignSelf: "stretch" }}>
          <Image
            source={{
              uri: imageUrl,
            }}
            onError={() => {
              setImageUrl(
                "https://plus.unsplash.com/premium_photo-1674713054504-4a6e71d26d29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              );
            }}
            style={styles.image(wide)}
            resizeMode="cover"
            alt="story-image"
          />
          <View style={styles.overlay} />
          {wide && (
            <Text style={styles.level(wide)}>{story.level || "Unknown"}</Text>
          )}
        </View>
      </View>
      <View style={styles.bottomSection(wide)}>
        {!wide && (
          <Text style={styles.level(wide)}>{story.level || "Unknown"}</Text>
        )}

        <Text style={styles.text(wide)}>{story.title}</Text>
        {wide && <Text style={styles.smallText}>{story.synopsis}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: (width, wide) => ({
    backgroundColor: "#313131",
    flexDirection: wide ? "row" : "column",
    alignItems: wide ? "flex-start" : "center",
    justifyContent: wide ? "flex-start" : "flex-start",
    alignSelf: "center",
    width: width ? width : 200,
    height: wide ? 100 : 250,
    borderRadius: 10,
    marginTop: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }),
  imageContainer: (wide) => ({
    // flex: 1,
    width: wide ? "30%" : "100%", // Smaller container if wide card
    minWidth: 10,
    height: wide ? "100%" : "60%",
    borderTopRightRadius: wide ? 0 : 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: wide ? 10 : 0,
    borderBottomRightRadius: 0,
    overflow: "hidden",
    position: "relative",
    tintColor: wide ? "rgba(255, 255, 255, 0.6)" : "none",
  }),

  image: (wide) => ({
    height: "100%",
    borderTopRightRadius: wide ? 0 : 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: wide ? 10 : 0,
    resizeMode: "cover",
  }),
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  bottomSection: (wide) => ({
    height: wide ? "100%" : "30%",
    padding: 10,
    flexDirection: "column",
    alignItems: wide ? "flex-start" : "flex-start",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    overflow: "hidden",
    marginLeft: wide ? 10 : null,
    width: wide ? "65%" : null,
  }),
  text: (wide) => ({
    color: "#fff",
    fontSize: wide ? 14 : 16,
    fontWeight: 400,
    fontFamily: FONT.medium,
    flexWrap: "wrap",
    flexShrink: wide ? null : 1,
    marginTop: wide ? 0 : 10,
    alignSelf: wide ? "flex-start" : "center",
  }),
  level: (wide) => ({
    borderRadius: 10,
    borderWidth: 1,
    borderColor: wide ? "#313131" : "#414141",
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: "#313131",
    color: "#fff",
    fontSize: 12,
    alignSelf: wide ? "auto" : "center",
    position: wide ? "absolute" : "relative",
    left: wide ? 10 : null,
    right: wide ? 10 : null,
    bottom: wide ? 2 : null,
    textAlign: "center",
    fontFamily: FONT.medium,
    textTransform: "uppercase",
  }),
  smallText: {
    fontSize: 12,
    color: "#fff",
    marginTop: 8,
    marginRight: 5,
    fontFamily: FONT.regular,
    height: "100%",
  },
});
