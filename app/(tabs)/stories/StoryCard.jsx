import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FONT } from "../../../constants/fonts";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import useSettingsStore from "../../../state/store";

const Card = ({ story, width }) => {
  const router = useRouter();
  const haptics = useSettingsStore((state) => state.haptics);
  const [imageUrl, setImageUrl] = useState(story?.imageUrl);
  const handlePress = () => {
    haptics && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(`/story/${story.gptId}`);
  };

  return (
    <TouchableOpacity style={styles.container(width)} onPress={handlePress}>
      <View style={styles.imageContainer()}>
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
            key={story.imageUrl}
            style={styles.image()}
            alt="story-image"
          />
          <View style={styles.overlay} />

          {story.read && (
            <View style={styles.read}>
              <Text style={styles.levelText}>Read</Text>
            </View>
          )}
          <View style={styles.level}>
            <Text style={styles.levelText}>{story.level || "Unknown"}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomSection()}>
        <Text style={styles.text}>{story.title}</Text>

        <Text style={styles.smallText} numberOfLines={5}>
          {story.synopsis}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: (width) => ({
    backgroundColor: "#313131",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "center",
    width: width ? width : 200,
    minHeight: 350,
    borderRadius: 10,
    marginTop: 15,
    shadowColor: "#262626",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginBottom: 10,
  }),
  imageContainer: () => ({
    marginTop: 5,
    width: "95%",
    minWidth: 10,
    height: "50%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "transparent",
  }),

  image: () => ({
    height: "100%",
    width: "100%",
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    resizeMode: "cover",
  }),
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  bottomSection: () => ({
    height: "50%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    overflow: "hidden",
    padding: 10,
  }),
  text: {
    color: "#eee",
    fontSize: 16,
    fontWeight: 400,
    fontFamily: FONT.bold,
    marginTop: 10,
    alignSelf: "flex-start",
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
  level: {
    padding: 10,
    backgroundColor: "#212121",
    borderRadius: 10,
    borderWidth: 0,
    // borderColor: "#414141",
    position: "absolute",
    bottom: 5,
    left: "5%",
    right: "5%",
    textAlign: "center",
    alignSelf: "center",
    width: "90%",
    shadowColor: "rgba(0,0,0,0.9)",
    // shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },
  read: {
    padding: 10,
    backgroundColor: "#242c23",
    borderRadius: 10,
    borderWidth: 0,
    // borderColor: "#414141",
    position: "absolute",
    top: 5,
    left: "5%",
    right: "5%",
    textAlign: "center",
    alignSelf: "center",
    width: "90%",
    shadowColor: "rgba(0,0,0,0.9)",
    // shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },
  levelText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: 400,
    fontFamily: FONT.medium,
    textAlign: "center",
    alignSelf: "center",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },

  smallText: {
    fontSize: 12,
    color: "#fff",
    marginTop: 20,
    fontFamily: FONT.regular,
    fontWeight: 100,
    flexWrap: "wrap",
    paddingHorizontal: 10,
    paddingBottom: 10,
    lineHeight: 20,
  },
});
