import { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Pressable,
} from "react-native";
import { FONT, DEFAULT_IMAGE, SIZES } from "../../../constants";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import useSettingsStore from "../../../state/store";
import { AntDesign } from "@expo/vector-icons";
import { darkTheme, lightTheme } from "../../../constants/theme";
import ContextMenu from "../../../components/ContextMenu";

const Card = ({ story, width, series }) => {
  const router = useRouter();
  const haptics = useSettingsStore((state) => state.haptics);
  const [imageUrl, setImageUrl] = useState(story?.imageUrl || DEFAULT_IMAGE);
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const [contextMenu, setContextMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

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

  const handleLongPress = (event) => {
    const touchableX = event.nativeEvent.locationX;
    const touchableY = event.nativeEvent.locationY;

    setPosition({ x: touchableX, y: touchableY });
    setContextMenu(true);
  };

  return (
    <Pressable
      style={[
        styles.container(width, theme),
        {
          height: series ? 250 : 300,
        },
      ]}
      onPress={handlePress}
      onLongPress={handleLongPress}
      onPressOut={() => setContextMenu(false)}
    >
      <View
        style={[
          styles.imageContainer,
          {
            width: series ? "100%" : "90%",
          },
        ]}
      >
        <View style={{ alignSelf: "stretch" }}>
          <Image
            source={{
              uri: imageUrl,
            }}
            onError={handleImageError}
            key={story.imageUrl}
            style={styles.image}
            alt="story-image"
          />
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.text(theme)} numberOfLines={3} ellipsizeMode="tail">
          {story.title} {story.part > 1 ? `Part ${story.part}` : ""}
        </Text>

        <Text style={styles.smallText(theme)} numberOfLines={3}>
          {story.synopsis}
        </Text>

        <View style={styles.infoText}>
          <Text style={styles.levelText(theme)}>
            {story.level || "Unknown"}
          </Text>
          <Text style={styles.levelText(theme)}>
            {story.topic || "Unknown"}
          </Text>
          {story.read && (
            <View style={styles.read}>
              <AntDesign
                name="checkcircle"
                size={12}
                color="#eee"
                style={{ marginRight: 1, padding: 2 }}
              />
              <Text style={[styles.levelText(theme), { color: "#eee" }]}>
                Read
              </Text>
            </View>
          )}
        </View>
      </View>
      {/* {contextMenu && <ContextMenu position={position} />} */}
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: (width, theme) => ({
    backgroundColor: "transparent",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: width ? width : 200,
    height: 300,
    minHeight: 200,
    marginTop: 20,
    paddingHorizontal: 5,
  }),
  imageContainer: {
    width: "90%",
    height: "50%",
    minWidth: 10,
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 10,
    shadowRadius: 5,
    elevation: 10,
  },

  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    alignSelf: "center",
    borderRadius: 5,
  },

  bottomSection: {
    width: "90%",
    height: "50%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    overflow: "hidden",
    // padding: 10,
    margin: 10,
  },
  text: (theme) => ({
    color: theme.text,
    fontSize: SIZES.regular,
    lineHeight: 20,
    fontWeight: 400,
    fontFamily: FONT.bold,
    // marginTop: 0,
    alignSelf: "flex-start",
    flexWrap: "wrap",
    // paddingHorizontal: 10,
  }),

  smallText: (theme) => ({
    fontSize: SIZES.small,
    color: theme.text,
    marginTop: 5,
    fontFamily: FONT.regular,
    fontWeight: 100,
    flexWrap: "wrap",
    // paddingHorizontal: 10,
    paddingBottom: 10,
    lineHeight: 20,
  }),

  infoText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  levelText: (theme) => ({
    color: theme.lighterText,
    fontSize: SIZES.xSmall,
    fontFamily: FONT.regular,
    textAlign: "left",
    alignSelf: "flex-start",
    textTransform: "uppercase",
    marginRight: 5,
    padding: 3,
  }),

  read: {
    padding: 0,
    backgroundColor: "#344332",
    borderRadius: 10,
    borderWidth: 0,
    textAlign: "center",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // Box Shadow
    shadowColor: "rgba(0,0,0,0.9)",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },
});
