import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { useSearchParams } from "expo-router";
import useSettingsStore from "../../state/store";
import useStoriesStore from "../../state/storiesStore";
import { darkTheme, lightTheme } from "../../constants/theme";
import { useStoryPage } from "../../hooks/useStoryPage";
import LevelCard from "./LevelCard";
import TranslationBox from "./TranslationBox";
import WordDisplay from "./WordDisplay";
import FullTranslationBox from "./FullTranslationBox";
import TapButtons from "./TapButtons";
import Header from "../../components/Header";
import { SIZES } from "../../constants";

const Story = () => {
  const { id } = useSearchParams();
  const [showTranslation, setShowTranslation] = useState(false);
  const showPinyin = useSettingsStore((state) => state.pinyin);
  const stories = useStoriesStore((state) => state.stories);
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  // HOOK
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
          <Header
            imageURL={story.imageUrl}
            headerTitle={`${story.title} ${story.part}`}
            backgroundColor={theme.headerBackground}
            tintColor={theme.text}
            fontSize={SIZES.medium}
          />

          <View style={styles.wrapper}>
            <LevelCard
              topic={story.topic}
              level={story.level}
              vote={story.options}
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
});
