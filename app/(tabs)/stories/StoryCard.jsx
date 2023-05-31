import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FONT } from "../../../constants/fonts";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import useSettingsStore from "../../../state/store";

const Card = ({ story, width }) => {
  const router = useRouter();
  const haptics = useSettingsStore((state) => state.haptics);

  const handlePress = () => {
    haptics && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(`/story/${story.gptId}`);
  };

  const imgJson = JSON.parse(story.image);
  const img = imgJson?.b64_json;

  return (
    <TouchableOpacity style={styles.container(width)} onPress={handlePress}>
      <View style={styles.imageContainer()}>
        <View style={{ alignSelf: "stretch" }}>
          <Image
            source={{
              uri: img
                ? `data:image/jpeg;base64,${img}`
                : "https://plus.unsplash.com/premium_photo-1674713054504-4a6e71d26d29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            }}
            style={styles.image()}
            alt="story-image"
          />
          <View style={styles.overlay} />
          <Text style={styles.level()}>{story.level}</Text>
        </View>
      </View>
      <View style={styles.bottomSection()}>
        <Text style={styles.text()}>{story.title}</Text>

        <Text style={styles.smallText}>{story.synopsis}</Text>
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
    height: 250,
    borderRadius: 20,
    marginTop: 15,
    shadowColor: "#262626",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  }),
  imageContainer: () => ({
    width: "100%",
    minWidth: 10,
    height: "40%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 0,
    overflow: "hidden",
    position: "relative",
  }),

  image: () => ({
    height: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 0,
    resizeMode: "cover",
  }),
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  bottomSection: () => ({
    height: "60%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    overflow: "hidden",
    padding: 10,
  }),
  text: () => ({
    color: "#eee",
    fontSize: 16,
    fontWeight: 400,
    fontFamily: FONT.bold,
    marginTop: 10,
    alignSelf: "center",
    flexWrap: "wrap",
  }),
  level: () => ({
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#262626",
    padding: 6,
    backgroundColor: "#262626",
    color: "#fff",
    fontSize: 10,
    position: "absolute",
    left: 75,
    bottom: 2,
    fontFamily: FONT.light,
  }),
  smallText: {
    fontSize: 15,
    color: "#fff",
    marginTop: 20,
    fontFamily: FONT.light,
    fontWeight: 100,
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
});
