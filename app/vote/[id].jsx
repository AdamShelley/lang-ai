import {
  Image,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import SubmitButton from "./SubmitButton";
import { Stack, useSearchParams } from "expo-router";
import { FONT, SIZES } from "../../constants";
import { useEffect, useState } from "react";
import useStoriesStore from "../../state/storiesStore";
import { Option } from "./Option";
import { darkTheme, lightTheme } from "../../constants/theme";
import useSettingsStore from "../../state/store";
import { useVoteHandler } from "../../hooks/useVoteHandler";
import LevelCards from "./LevelCards";

const DEFAULT_IMAGE_URI =
  "https://plus.unsplash.com/premium_photo-1674713054504-4a6e71d26d29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80";

const Vote = () => {
  const { id } = useSearchParams();
  const stories = useStoriesStore((state) => state.stories);
  const [story, setStory] = useState();
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const {
    selectedOption,
    submitted,
    error,
    handleOptionChoice,
    handleVoteSubmission,
    checkForVote,
    fetchSpecificStory,
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
          <Image
            source={{
              uri: story?.imageUrl ? story.imageUrl : DEFAULT_IMAGE_URI,
            }}
            style={styles.image}
            alt="story-image"
          />
          <Stack.Screen
            options={{
              headerTitle: `Vote on the next part!`,
              headerStyle: {
                backgroundColor: "#212124",
              },
              headerTintColor: "#eee",
              headerTitleStyle: {
                fontSize: SIZES.medium,
                fontFamily: FONT.medium,
                color: "#eee",
              },
            }}
          />

          <View style={styles.wrapper}>
            <LevelCards level={story.level} title={story.title} />

            <ScrollView
              horizontal={false}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <Text style={styles.synopsis(theme)} numberOfLines={3}>
                Story so far: {story.synopsis}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.text(theme)}>
                  Vote on how you want the story to progress.
                </Text>

                <View style={styles.optionsContainer(theme)}>
                  {!story.voted ? (
                    story.options.map((option, index) => (
                      <Option
                        key={index}
                        option={option}
                        index={index}
                        handleOptionChoice={handleOptionChoice}
                        selectedOption={selectedOption}
                        submitted={submitted}
                        disabled={story.voted}
                        theme={theme}
                      />
                    ))
                  ) : (
                    <Option
                      key={story.votedOption}
                      index={story.votedOption}
                      option={story.options[story.votedOption]}
                      selectedOption={story.votedOption}
                      submitted={submitted}
                      theme={theme}
                      disabled
                    />
                  )}
                </View>
              </View>
              {story.voted ||
                (!submitted && <SubmitButton onPress={handleVoteSubmission} />)}
              {story.voted && (
                <Text style={{ ...styles.text(theme), marginBottom: 50 }}>
                  Thanks, your vote has been cast!
                </Text>
              )}
              {error && (
                <Text style={styles.text(theme)}>Oh dear - {error}</Text>
              )}
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
  synopsis: (theme) => ({
    color: theme.text,
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    width: "80%",
    alignSelf: "center",
    textAlign: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
    lineHeight: 25,
    marginTop: 90,
  }),
  wrapper: {
    width: "100%",
    flex: 1,
  },
  text: (theme) => ({
    color: theme.text,
    paddingVertical: 5,
    paddingHorizontal: 2,
    marginHorizontal: 2,
    margin: 2,
    marginBottom: 0,
    fontSize: SIZES.medium,
    fontWeight: 400,
    textAlign: "center",
  }),
  optionsContainer: (theme) => ({
    flex: 1,
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    maxHeight: "50%",
  }),
});
