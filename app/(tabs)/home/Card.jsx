import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FONT } from "../../../constants/fonts";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import useSettingsStore from "../../../state/store";
import { darkTheme, lightTheme } from "../../../constants/theme";

const Card = ({ story, width, wide = false }) => {
  const router = useRouter();
  const haptics = useSettingsStore((state) => state.haptics);
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const [imageUrl, setImageUrl] = useState(story?.imageUrl);

  const handlePress = (id) => {
    haptics && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    router.push(`/story/${id}`);
  };

  return (
    <TouchableOpacity
      style={styles.container(width, wide, theme)}
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
            <View style={styles.wideLevel}>
              <Text style={styles.levelText(theme)}>
                {story.level || "Unknown"}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.bottomSection(wide)}>
        {!wide && (
          <Text style={styles.nonWideLevel(wide, theme)}>
            {story.level || "Unknown"}
          </Text>
        )}

        <Text style={styles.text(wide, theme)}>{story.title}</Text>
        {wide && (
          <Text style={styles.smallText(theme)} numberOfLines={3}>
            {story.synopsis}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: (width, wide, theme) => ({
    backgroundColor: theme.cardColor,
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
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 10,
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
    flex: 1,
  }),
  wideLevel: {
    padding: 5,
    backgroundColor: "#212121",
    borderRadius: 10,
    borderWidth: 0,
    borderColor: "#313131",
    position: "absolute",
    bottom: 2,
    left: "10%",
    right: "10%",
    textAlign: "center",
    alignSelf: "center",
    shadowColor: "rgba(0,0,0,0.9)",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },
  levelText: (theme) => ({
    color: "#eee",
    fontSize: 14,
    fontWeight: 400,
    fontFamily: FONT.medium,
    textAlign: "center",
    alignSelf: "center",
    textTransform: "uppercase",
  }),
  text: (wide, theme) => ({
    color: theme.text,
    fontSize: wide ? 14 : 14,
    fontWeight: 400,
    fontFamily: FONT.bold,
    flexWrap: "wrap",
    flexShrink: wide ? null : 1,
    marginTop: wide ? 0 : 10,
    alignSelf: wide ? "flex-start" : "center",
  }),
  nonWideLevel: (wide, theme) => ({
    borderRadius: 10,
    borderWidth: theme === lightTheme ? 0 : 1,
    borderColor: wide ? "#313131" : "#e6e6e6b1",
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: theme.background,
    color: theme.text,
    fontSize: 12,
    alignSelf: wide ? "auto" : "center",
    position: wide ? "absolute" : "relative",
    left: wide ? 10 : null,
    right: wide ? 10 : null,
    bottom: wide ? 1 : null,
    textAlign: "center",
    fontFamily: FONT.medium,
    textTransform: "uppercase",
  }),
  smallText: (theme) => ({
    fontSize: 12,
    color: theme.text,
    marginTop: 8,
    marginRight: 5,
    fontFamily: FONT.regular,
    height: "100%",
  }),
});
