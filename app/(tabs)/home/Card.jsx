import { useCallback } from "react";
import { StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import useSettingsStore from "../../../state/store";
import { darkTheme, lightTheme } from "../../../constants/theme";
import CardImage from "./CardImage";
import CardContent from "./CardContent";

const Card = ({ story, width, wide = false }) => {
  const router = useRouter();
  const haptics = useSettingsStore((state) => state.haptics);
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const handlePress = useCallback(
    (id) => {
      if (Platform.OS === "ios") {
        haptics && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } else {
        haptics &&
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      router.push(`/story/${id}`);
    },
    [haptics, router]
  );

  const handleLongPress = useCallback(() => {}, []);

  return (
    <Pressable
      style={[
        styles.container(wide),
        {
          width: width || 200,
          backgroundColor: wide ? "transparent" : theme.cardColor,
        },
      ]}
      onPress={() => handlePress(story.gptId)}
      onLongPress={handleLongPress}
    >
      <CardImage wide={wide} theme={theme} story={story} />
      <CardContent wide={wide} story={story} />
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: (wide) => ({
    flexDirection: wide ? "row" : "column",
    alignItems: wide ? "flex-start" : "center",
    justifyContent: "flex-start",
    alignSelf: "center",
    height: wide ? 100 : 250,
    borderRadius: wide ? 0 : 10,
    marginTop: 20,
    overflow: "hidden",
  }),
});
