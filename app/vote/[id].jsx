import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useSearchParams } from "expo-router";
import { SIZES } from "../../constants";
import { useEffect, useState } from "react";
import useStoriesStore from "../../state/storiesStore";
import { darkTheme, lightTheme } from "../../constants/theme";
import useSettingsStore from "../../state/store";
import { useVoteHandler } from "../../hooks/useVoteHandler";
import LevelCards from "./LevelCards";
import Header from "../../components/Header";
import VoteOptions from "./VoteOptions";
import VoteStatus from "./VoteStatus";
import VoteFooter from "./VoteFooter";
import VoteSynopsis from "./VoteSynopsis";

const Vote = () => {
  const { id } = useSearchParams();
  const stories = useStoriesStore((state) => state.stories);
  const [story, setStory] = useState();
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);

  // HOOK
  const {
    selectedOption,
    submitted,
    error,
    handleOptionChoice,
    handleVoteSubmission,
    checkForVote,
    fetchSpecificStory,
    timeLeft,
  } = useVoteHandler(id, story, setStory);

  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    if (!stories.length) {
      fetchSpecificStory(id);
    } else {
      const foundStory = stories.find((story) => story.gptId === id);
      setStory(foundStory);
    }

    checkForVote();
  }, [id, stories]);

  return (
    <SafeAreaView style={styles.container(theme)}>
      <StatusBar style="light" />
      {story && (
        <>
          <Header
            imageURL={story.imageUrl}
            headerTitle="Vote on the next part!"
            backgroundColor="#212124"
            tintColor="#eee"
            fontSize={SIZES.medium}
          />

          <View style={styles.wrapper}>
            {/* BADGES for level/genre */}
            <LevelCards level={story.level} title={story.title} />

            <ScrollView
              horizontal={false}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              {/* Synopsis */}
              <VoteSynopsis theme={theme} synopsis={story?.synopsis} />

              <View style={{ flex: 1 }}>
                {/* If voting is still open */}
                <VoteStatus theme={theme} timeLeft={timeLeft} />

                {/* Show 3 options if not submitted/Or the option the user picked */}
                <VoteOptions
                  theme={theme}
                  story={story}
                  handleOptionChoice={handleOptionChoice}
                  submitted={submitted}
                  selectedOption={selectedOption}
                />
              </View>

              <VoteFooter
                handleVoteSubmission={handleVoteSubmission}
                theme={theme}
                story={story}
                submitted={submitted}
                error={error}
              />
            </ScrollView>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Vote;

const styles = StyleSheet.create({
  container: (theme) => ({
    flex: 1,
    backgroundColor: theme.background,
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  }),
  wrapper: {
    width: "100%",
    flex: 1,
  },
});
