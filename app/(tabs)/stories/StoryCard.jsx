import { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { FONT, DEFAULT_IMAGE } from "../../../constants";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import useSettingsStore from "../../../state/store";

import { darkTheme, lightTheme } from "../../../constants/theme";

const Card = ({ story, width }) => {
  const router = useRouter();
  const haptics = useSettingsStore((state) => state.haptics);
  const [imageUrl, setImageUrl] = useState(story?.imageUrl || DEFAULT_IMAGE);
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const handlePress = useCallback(() => {
    if (Platform.OS === "ios") {
      haptics && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      haptics &&
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    router.push(`/story/${story.gptId}`);
  }, [router, haptics]);

  const handleImageError = useCallback(() => {
    setImageUrl(DEFAULT_IMAGE);
  }, []);

  return (
    <TouchableOpacity
      style={styles.container(width, theme)}
      onPress={handlePress}
    >
      <View style={styles.imageContainer()}>
        <View style={{ alignSelf: "stretch" }}>
          <Image
            source={{
              uri: imageUrl,
            }}
            onError={handleImageError}
            key={story.imageUrl}
            style={styles.image()}
            alt="story-image"
          />
          <View style={styles.overlay} />

          {story.read && (
            <View style={styles.read}>
              <Text style={styles.levelText(theme)}>Read</Text>
            </View>
          )}
          <View style={styles.level}>
            <Text style={styles.levelText(theme)}>
              {story.level || "Unknown"}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomSection()}>
        <Text style={styles.text(theme)} numberOfLines={3} ellipsizeMode="tail">
          {story.title}
        </Text>

        <Text style={styles.smallText(theme)} numberOfLines={3}>
          {story.synopsis}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: (width, theme) => ({
    backgroundColor: theme.cardColor,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "center",
    width: width ? width : 200,
    height: 300,
    minHeight: 300,
    borderRadius: 10,
    marginTop: 15,
    shadowColor: "#1a1a1a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  }),
  imageContainer: () => ({
    // marginTop: 5,
    width: "100%",
    minWidth: 10,
    height: "50%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.75,
    shadowRadius: 50,
    elevation: 5,
  }),

  image: () => ({
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    alignSelf: "center",
  }),
  overlay: {
    position: "absolute",
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
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
  text: (theme) => ({
    color: theme.text,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 400,
    fontFamily: FONT.bold,
    marginTop: 10,
    alignSelf: "flex-start",
    flexWrap: "wrap",
    paddingHorizontal: 10,
  }),
  level: {
    padding: 10,
    backgroundColor: "#212121",
    borderRadius: 10,
    borderWidth: 0,
    // borderColor: "#414141",
    position: "absolute",
    bottom: 5,
    left: "25%",
    right: "25%",
    textAlign: "center",
    alignSelf: "center",
    width: "50%",
    shadowColor: "rgba(0,0,0,0.9)",
    // shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },
  read: {
    padding: 10,
    backgroundColor: "#344332",
    borderRadius: 10,
    borderWidth: 0,
    // borderColor: "#414141",
    position: "absolute",
    top: 5,
    left: "25%",
    right: "25%",
    textAlign: "center",
    alignSelf: "center",
    width: "50%",
    shadowColor: "rgba(0,0,0,0.9)",
    // shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },
  levelText: (theme) => ({
    color: "#eee",
    fontSize: 12,
    fontWeight: 400,
    fontFamily: FONT.medium,
    textAlign: "center",
    alignSelf: "center",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  }),

  smallText: (theme) => ({
    fontSize: 12,
    color: theme.text,
    marginTop: 10,
    fontFamily: FONT.regular,
    fontWeight: 100,
    flexWrap: "wrap",
    paddingHorizontal: 10,
    paddingBottom: 10,
    lineHeight: 20,
  }),
});
