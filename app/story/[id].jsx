import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Platform,
} from "react-native";
import { Stack, useSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { FONT } from "../../constants/fonts";
import { useEffect, useState } from "react";
import Filter from "../../components/Filter";
import useSettingsStore from "../../state/store";
import useStoriesStore from "../../state/storiesStore";
import { darkTheme, lightTheme } from "../../constants/theme";
import { useStoryPage } from "../../hooks/useStoryPage";
import LevelCard from "./LevelCard";
import TranslationBox from "./TranslationBox";
import WordDisplay from "./WordDisplay";
import FullTranslationBox from "./FullTranslationBox";
import TapButtons from "./TapButtons";

const Story = () => {
  const { id } = useSearchParams();
  const [showTranslation, setShowTranslation] = useState(false);
  const showPinyin = useSettingsStore((state) => state.pinyin);
  const stories = useStoriesStore((state) => state.stories);
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  // LOGIC
  const {
    story,
    setStory,
    modifiedWords,
    showWord,
    shownWord,
    setShownWord,
    wordDef,
    setWordDef,
    handleFilterPress,
    handleFinishedStory,
    getStoryFromAsyncStorage,
    fontSize,
    goToVotePage,
  } = useStoryPage(id);

  useEffect(() => {
    if (!stories.length) {
      getStoryFromAsyncStorage(id);
    } else {
      const foundStory = stories.find((story) => story.gptId === id);
      setStory(foundStory);
    }
  }, [id, stories]);

  return (
    <SafeAreaView style={styles.container(theme)}>
      <StatusBar style="dark" />
      {story && (
        <>
          <Image
            source={{
              uri: story?.imageUrl
                ? story.imageUrl
                : "https://plus.unsplash.com/premium_photo-1674713054504-4a6e71d26d29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            }}
            style={styles.image}
            alt="story-image"
          />
          <Stack.Screen
            options={{
              headerTitle: `${story.title} ${story.part}`,

              headerStyle: {
                backgroundColor: theme.headerBackground,
              },
              headerTintColor: theme.text,
              headerTitleStyle: {
                fontSize: 16,
                fontFamily: FONT.medium,
                color: theme.text,
              },
            }}
          />

          <View style={styles.wrapper}>
            <LevelCard
              topic={story.topic}
              level={story.level}
              vote={story.options}
              theme={theme}
            />

            <TranslationBox
              theme={theme}
              shownWord={shownWord}
              wordDef={wordDef}
            />

            <WordDisplay
              story={story}
              theme={theme}
              fontSize={fontSize}
              modifiedWords={modifiedWords}
              showWord={showWord}
              showPinyin={showPinyin}
              shownWord={shownWord}
              setShownWord={setShownWord}
              goToVotePage={goToVotePage}
              setWordDef={setWordDef}
            />

            {showTranslation && (
              <FullTranslationBox
                theme={theme}
                translation={story.translation}
              />
            )}

            <TapButtons
              story={story}
              theme={theme}
              showTranslation={showTranslation}
              handleFilterPress={handleFilterPress}
              handleFinishedStory={handleFinishedStory}
              setShowTranslation={setShowTranslation}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Story;

const styles = StyleSheet.create({
  container: (theme) => ({
    flex: 1,
    backgroundColor: theme.headerBackground,
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  }),
  titleContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
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
    marginTop: 10,
    color: "#fff",
    fontSize: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 50,
    fontFamily: FONT.medium,
  },

  fullTranslation: (theme) => ({
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: "10%",
    backgroundColor: theme.headerBackground,
  }),
});
