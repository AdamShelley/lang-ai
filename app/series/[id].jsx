import { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import useSettingsStore from "../../state/store";
import useStoriesStore from "../../state/storiesStore";
import { darkTheme, lightTheme } from "../../constants/theme";
import { SIZES, FONT } from "../../constants";

import StoryCard from "../(tabs)/stories/StoryCard";

const Series = () => {
  const { id: title } = useLocalSearchParams();

  const stories = useStoriesStore((state) => state.stories);
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  // Filter the stories by title (aka series)
  const series = stories.filter((story) => story.title === title);

  // Sort by parts, part 1 first etc
  series.sort((a, b) => a.part - b.part);

  return (
    <SafeAreaView style={styles.container(theme)}>
      <StatusBar style="dark" />

      <Stack.Screen
        options={{
          headerTitle: "All Parts",
          headerStyle: {
            backgroundColor: "#212124",
          },
          headerTintColor: "#eee",
          headerTransparent: true,
          headerTitleStyle: {
            fontSize: SIZES.large,
            fontFamily: FONT.medium,
            color: "#eee",
          },
        }}
      />

      <ScrollView style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          {/* <Text style={styles.title}>{title}</Text> */}
          <View style={styles.cardWrapper}>
            {series &&
              series.map((story) => (
                <StoryCard
                  key={story.gptId}
                  story={story}
                  width={"95%"}
                  onPress={() =>
                    navigation.navigate("Story", { id: story.gptId })
                  }
                />
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Series;

const styles = StyleSheet.create({
  container: (theme) => ({
    flex: 1,
    backgroundColor: theme.headerBackground,
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  }),
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    position: "absolute",
    opacity: 0.1,
  },
  wrapper: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: "#eee",
    textTransform: "uppercase",
    letterSpacing: 0.2,
    textAlign: "center",
    marginTop: 20,
  },
  cardWrapper: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: Platform.OS === "ios" ? 50 : 100,
  },
});
