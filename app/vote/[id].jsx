import {
  Image,
  View,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";

import { Stack, useRouter, useSearchParams } from "expo-router";
import { FONT } from "../../constants/fonts";
import { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
import useStoriesStore from "../../state/storiesStore";
import { Option } from "./Option";
import { URL_DEV } from "@env";

import useVoteOptionsStore from "../../state/voteOptionsStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Vote = () => {
  const router = useRouter();
  const { id } = useSearchParams();
  const stories = useStoriesStore((state) => state.stories);
  const [story, setStory] = useState();
  const setStories = useStoriesStore((state) => state.setStories);

  const { selectOption, submit } = useVoteOptionsStore();

  const [selectedOption, setSelectedOption] = useState(-1);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!stories.length) {
      fetchSpecificStory(id);
    } else {
      const foundStory = stories.find((story) => story.gptId === id);
      setStory(foundStory);
    }
  }, [id, stories]);

  // Fetch specific story from DB
  const fetchSpecificStory = async (id) => {
    try {
      const response = await fetch(`${URL_DEV}/db/${id}`);
      const data = await response.json();
      data[0].words = data[0].words.map((obj) => JSON.parse(obj));
      setStory(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionChoice = async (option, index) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedOption(index);
  };

  const handleVoteSubmission = async () => {
    // Animate the other 2 options to fade out and move the clicked item to the middle
    if (selectedOption === -1) {
      alert("Please select an option!");
      return;
    }

    try {
      submit();
      // Add voted:true to this stories asyncStorage
      const storiesFromStorage = await AsyncStorage.getItem("stories");
      if (!storiesFromStorage) throw new Error("No Stories in storage");
      const stories = JSON.parse(storiesFromStorage);
      // Find the story clicked and update the voted property
      const foundStory = stories.find((s) => s.gptId === story.gptId);
      if (!foundStory) throw new Error("No story found");
      foundStory.voted = foundStory.voted ? false : true;
      foundStory.votedOption = selectedOption;
      await AsyncStorage.setItem("stories", JSON.stringify(stories));
      setStory(foundStory);
      // Update global state
      setStories(stories);

      // Send the vote to DB
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
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
              headerTitle: `Vote on the next part!`,
              headerStyle: {
                backgroundColor: "#212124",
              },
              headerTintColor: "#eee",
              headerTitleStyle: {
                fontSize: 16,
                fontFamily: FONT.medium,
                color: "#eee",
              },
            }}
          />

          <View style={styles.wrapper}>
            <View style={styles.levelCard(false)}>
              <Text style={styles.level}>{story.level}</Text>
            </View>
            <View style={styles.levelCard(true)}>
              <Text style={styles.level}>{story.title}</Text>
            </View>

            <ScrollView
              horizontal={false}
              contentContainerStyle={styles.wordWrapper}
            >
              <Text style={styles.synopsis}>
                Story so far: {story.synopsis}
              </Text>
              <View>
                <Text style={styles.text}>
                  Vote on how you want the story to progress.
                </Text>
                {/* <Text style={styles.text}>
                  {story.voted ? "voted" : "not voted"}
                  {story.votedOption}
                </Text> */}
                <View style={styles.optionsContainer}>
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
                      />
                    ))
                  ) : (
                    <Option
                      key={story.votedOption}
                      index={story.votedOption}
                      option={story.options[story.votedOption]}
                      selectedOption={story.options[story.votedOption]}
                      submitted={true}
                      disabled
                    />
                  )}
                </View>
              </View>
              {story.voted ||
                (!submitted && (
                  <Pressable
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed
                          ? "rgba(0, 0, 0, 0.3)"
                          : "#464646",
                      },
                      styles.submitButton,
                    ]}
                    onPress={handleVoteSubmission}
                    disabled={selectedOption === -1}
                  >
                    <Text style={styles.submitButtonText}>Submit Vote</Text>
                  </Pressable>
                ))}
              {story.voted && (
                <Text style={styles.text}>
                  Thanks, your vote has been cast!
                </Text>
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
  container: {
    flex: 1,
    backgroundColor: "#212124",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
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
  levelCard: (title) => ({
    height: 40,
    width: title ? "50%" : 50,
    minWidth: title ? 100 : 50,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 20,
    left: title ? 100 : 20,
    zIndex: 5,
    paddingHorizontal: 5,
  }),
  level: {
    fontSize: 12,
    fontFamily: FONT.bold,
    color: "#212124",
    textTransform: "uppercase",
    textAlign: "center",
  },
  synopsis: {
    color: "#fff",
    fontSize: 16,
    fontFamily: FONT.medium,
    width: "80%",
    alignSelf: "center",
    textAlign: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
    lineHeight: 25,
    marginTop: 90,
  },
  wrapper: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#e6e6e6",
    paddingVertical: 5,
    paddingHorizontal: 2,
    marginHorizontal: 2,
    margin: 2,
    marginBottom: 0,
    fontSize: 16,
    fontWeight: 400,
    textAlign: "center",
  },
  optionsContainer: {
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "80%",
  },
  submitButton: {
    // backgroundColor: "#464646",
    width: "50%",
    borderRadius: 50,
    marginTop: 30,
    alignSelf: "center",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: FONT.medium,
    paddingVertical: 10,
    textAlign: "center",
  },
});
