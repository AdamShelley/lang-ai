import { useState } from "react";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStoriesStore from "../state/storiesStore";
import useSettingsStore from "../state/store";
import useVoteOptionsStore from "../state/voteOptionsStore";
import { LIVE_URL } from "@env";

export const useVoteHandler = (id, story, setStory) => {
  const setStories = useStoriesStore((state) => state.setStories);
  const haptics = useSettingsStore((state) => state.haptics);
  const { selectOption, submit } = useVoteOptionsStore();
  const [selectedOption, setSelectedOption] = useState(-1);
  const [timeLeft, setTimeLeft] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [voteId, setVoteId] = useState(null);
  const [error, setError] = useState(null);

  const handleOptionChoice = async (option, index) => {
    if (Platform.OS === "ios") {
      haptics && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      haptics &&
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

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
      setSubmitted(true);

      console.log(
        JSON.stringify({
          pollId: voteId,
          option: `option_${selectedOption + 1}`,
        })
      );

      // Send the vote to DB
      const response = await fetch(`${LIVE_URL}/voting/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pollId: voteId,
          option: `option_${selectedOption + 1}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Network Issue", response.statusText);
        setError("Network Issue");
      }
    } catch (error) {
      console.log(error);
      setError("Error in submitting vote");
    }
  };

  const checkForVote = async () => {
    try {
      const response = await fetch(`${LIVE_URL}/voting/getPoll/${id}`);
      const data = await response.json();
      setVoteId(data.id);

      // Check if vote is completed:
      if (data.completed) {
        setSubmitted(true);
        return;
      }

      // Check for time left
      const endDate = new Date(data.end_date);
      const timeLeftMs = endDate - Date.now();

      const hoursLeft = Math.floor(timeLeftMs / (1000 * 60 * 60));
      const minutesLeft = Math.floor(
        (timeLeftMs % (1000 * 60 * 60)) / (1000 * 60)
      );

      setTimeLeft(`${hoursLeft} hours ${minutesLeft} minutes`);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSpecificStory = async (id) => {
    try {
      const response = await fetch(`${LIVE_URL}/db/${id}`);
      const data = await response.json();
      data[0].words = data[0].words.map((obj) => JSON.parse(obj));
      setStory(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    selectedOption,
    submitted,
    voteId,
    setVoteId,
    error,
    timeLeft,
    handleOptionChoice,
    handleVoteSubmission,
    checkForVote,
    fetchSpecificStory,
  };
};
