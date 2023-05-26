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
    router.push(`/story/${story.id}`);
  };

  return (
    <TouchableOpacity style={styles.container(width)} onPress={handlePress}>
      <View style={styles.imageContainer()}>
        <View style={{ alignSelf: "stretch" }}>
          <Image
            source={{ uri: story.image }}
            style={styles.image()}
            alt="story-image"
          />
          <View style={styles.overlay} />
          <Text style={styles.level()}>{story.level}</Text>
        </View>
      </View>
      <View style={styles.bottomSection()}>
        <Text style={styles.text()}>{story.title}</Text>

        <Text style={styles.smallText}>{story.tease}</Text>
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
    height: "50%",
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
    height: "50%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    overflow: "hidden",
    padding: 5,
  }),
  text: () => ({
    color: "#fff",
    fontSize: 16,
    fontWeight: 400,
    // paddingHorizontal: 10,
    fontFamily: FONT.medium,
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
    fontSize: 14,
    color: "#fff",
    marginTop: 20,
    fontFamily: FONT.regular,
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
});
