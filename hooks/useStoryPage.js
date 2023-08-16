import { useState } from "react";
import { Platform } from "react-native";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useSettingsStore from "../state/store";
import useStoriesStore from "../state/storiesStore";
import useDictionaryStore from "../state/dictionaryStore";
import { useRouter } from "expo-router";

export const useStoryPage = (id) => {
  const router = useRouter();
  // STORE
  const textSize = useSettingsStore((state) => state.textSize);
  const haptics = useSettingsStore((state) => state.haptics);
  const dictionary = useDictionaryStore((state) => state.words);
  const setStories = useStoriesStore((state) => state.setStories);
  const setPinyin = useSettingsStore((state) => state.setPinyin);
  // STATE
  const [story, setStory] = useState();
  const [shownWord, setShownWord] = useState("");
  const [wordDef, setWordDef] = useState("");

  // LOGIC
  const getStoryFromAsyncStorage = async (storyId) => {
    try {
      const storiesFromStorage = await AsyncStorage.getItem("stories");

      if (!storiesFromStorage) throw new Error("No Stories in storage");

      const stories = JSON.parse(storiesFromStorage);
      const foundStory = stories.find((story) => story.gptId === storyId);

      if (!foundStory) throw new Error("No story found");

      setStory(foundStory);
    } catch (error) {
      console.log("Error fetching story from AsyncStorage", error);
    }
  };

  const joinWordsAndFullStops = (words) => {
    return words.reduce((acc, word, index) => {
      if (word.chineseWord === "." && acc.length > 0) {
        acc[acc.length - 1] = {
          ...acc[acc.length - 1],
          chineseWord: acc[acc.length - 1].chineseWord + ".",
        };
      } else {
        acc.push(word);
      }
      return acc;
    }, []);
  };

  const modifiedWords = story ? joinWordsAndFullStops(story.words) : [];

  // Button functionality
  const showWord = (e, word) => {
    // If word is puntionation, don't do anything
    if (/^[\p{Punctuation}]+$/u.test(word.chineseWord)) {
      setShownWord("");
      setWordDef("");
      return;
    }

    if (Platform.OS === "ios") {
      haptics && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      haptics &&
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    setShownWord(word);

    // Dictionary length

    // console.log(dictionary[word.chineseWord], word);
    if (word.chineseWord in dictionary) {
      setWordDef(dictionary[word.chineseWord]);
    } else {
      setWordDef(word);
    }
  };

  const handleFilterPress = () => {
    if (Platform.OS === "ios") {
      haptics && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      haptics &&
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    setPinyin();
  };

  const handleFinishedStory = () => {
    if (Platform.OS === "ios") {
      haptics && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      haptics &&
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    // Get entry out of local storage and update it with read:true
    const updateStory = async () => {
      try {
        const storiesFromStorage = await AsyncStorage.getItem("stories");

        if (!storiesFromStorage) throw new Error("No Stories in storage");

        const stories = JSON.parse(storiesFromStorage);

        // Find the story clicked and update it to read
        const foundStory = stories.find((s) => s.gptId === story.gptId);

        if (!foundStory) throw new Error("No story found");

        foundStory.read = foundStory.read ? false : true;
        console.log(foundStory.title, foundStory.read);
        await AsyncStorage.setItem("stories", JSON.stringify(stories));
        // set the local state
        setStories(stories);
      } catch (error) {
        console.log("Bugging out at updating story");
        console.log(error);
      }
    };

    updateStory();
    router.replace("/");
  };

  // Set textSize
  let fontSize = 30;
  switch (textSize) {
    case "small":
      fontSize = 20;
      break;
    case "medium":
      fontSize = 30;
      break;
    case "large":
      fontSize = 40;
      break;
    default:
      fontSize = 30;
  }

  const goToVotePage = () => {
    router.push(`/vote/${id}`);
  };

  return {
    story,
    setStory,
    modifiedWords,
    showWord,
    shownWord,
    wordDef,
    setWordDef,
    setShownWord,
    handleFilterPress,
    handleFinishedStory,
    getStoryFromAsyncStorage,
    fontSize,
    goToVotePage,
  };
};
