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
    justifyContent: wide ? "flex-start" : "center",
    alignSelf: "center",
    width: width ? width : 200,
    height: wide ? 100 : 200,
    borderRadius: 20,
    marginTop: 15,
    // marginLeft: 15,
    overflow: "hidden",
    shadowColor: "#262626",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  }),
  imageContainer: (wide) => ({
    // flex: 1,
    width: wide ? "30%" : "95%", // Smaller container if wide card
    minWidth: 10,
    height: wide ? "100%" : "65%",
    borderTopRightRadius: wide ? 0 : 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: wide ? 0 : 20,
    borderBottomRightRadius: wide ? 0 : 20,
    overflow: "hidden",
    position: "relative",
  }),

  image: (wide) => ({
    height: "100%",
    borderTopRightRadius: wide ? 0 : 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: wide ? 20 : 0,
    resizeMode: "cover",
  }),
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  bottomSection: (wide) => ({
    height: wide ? "100%" : "30%",
    padding: 10,
    flexDirection: wide ? "column" : "row",
    alignItems: wide ? "flex-start" : "center",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    overflow: "hidden",
    marginLeft: wide ? 10 : null,
    width: wide ? "70%" : null,
  }),
  text: (wide) => ({
    color: "#fff",
    fontSize: 16,
    fontWeight: 400,
    paddingHorizontal: wide ? 0 : 10,
    // marginHorizontal: 10,
    fontFamily: FONT.medium,
    flexWrap: "wrap",
    flexShrink: 1,
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
    marginTop: 15,
    marginRight: 5,
    fontFamily: FONT.regular,
    height: "100%",
  },
});
