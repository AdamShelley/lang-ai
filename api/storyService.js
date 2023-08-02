import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL_DEV, LIVE_URL } from "@env";
import moment from "moment";

const { getTimestamp, shouldUpdate } = require("../utils/shouldUpdate");

export const fetchStoriesFromServer = async (forceFetch = false) => {
  try {
    const lastUpdate = await AsyncStorage.getItem("lastUpdateStories");
    const shouldUpdateStories = lastUpdate ? parseInt(lastUpdate, 10) : null;

    // Check for stories in async storage
    const storiesFromStorage = await AsyncStorage.getItem("stories");

    //  If no need to fetch new data, use local storage

    console.log("UPDATE REQUIRED?:", shouldUpdate(shouldUpdateStories));
    if (
      storiesFromStorage?.length &&
      !forceFetch &&
      !shouldUpdate(shouldUpdateStories)
    ) {
      console.log("Using local storage Stories");

      const parsedStories = JSON.parse(storiesFromStorage);
      return parsedStories;
    } else {
      console.log("FETCHING STORIES FROM SERVER");
      const response = await fetch(`${LIVE_URL}/db`);
      const data = await response.json();

      // Parse the word array in each story
      const newData = data.map((story) => {
        story.words = story?.words?.map((obj) => JSON.parse(obj));
        return { ...story };
      });

      console.log(newData.length);

      const timestamp = getTimestamp();
      await AsyncStorage.setItem("lastUpdateStories", timestamp.toString());

      return newData;
    }
  } catch (error) {
    console.log("----fetch stories from server");
    console.error(error);
    return error;
  }
};

export const fetchImagesFromServer = async (stories, batchSize = 5) => {
  try {
    const imageUrls = [];
    let imageMap = {};

    for (let i = 0; i < stories.length; i += batchSize) {
      const batch = stories.slice(i, i + batchSize + 1);
      const imageList = batch.map((story) => `${story.gptId}-${story.title}`);

      // Fetch this batch of images from the server
      const response = await fetch(`${LIVE_URL}/db/images`, {
        method: "POST",
        body: JSON.stringify({ imageList }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      imageUrls.push(data);
      // Flatten the structure
      for (let index in data) {
        imageMap = { ...imageMap, ...data[index] };
      }
    }

    // Now merge the stories with their corresponding image URLs
    const storiesWithImages = stories.map((story) => {
      const key = `${story.gptId}-${story.title}`;
      return {
        ...story,
        imageUrl: imageMap[key],
      };
    });

    // Save stories to local Storage
    await AsyncStorage.setItem("stories", JSON.stringify(storiesWithImages));

    return storiesWithImages;
  } catch (error) {
    console.log("----fetch images from server");

    return console.log(error);
  }
};

export const getStoriesFromStorage = async () => {
  const storiesFromStorage = await AsyncStorage.getItem("stories");
  if (storiesFromStorage) {
    return JSON.parse(storiesFromStorage);
  }
  return null;
};

export const saveStoriesToStorage = async (stories) => {
  await AsyncStorage.setItem("stories", JSON.stringify(stories));
};

export const updateLocalStorage = async (newData) => {
  try {
    // Update local storage with new data
    await AsyncStorage.setItem("stories", JSON.stringify(newData));
  } catch (error) {
    console.error("Error updating local storage:", error);
  }
};

export const setStoryLevels = (stories) => {
  if (!stories) return [];

  const storyLevels = stories?.map((story) =>
    story?.level ? story.level.toUpperCase() : "Unknown"
  );

  const uniqueLevels = [...new Set(storyLevels)];

  // Sort levels alphabetically
  uniqueLevels.sort();

  return uniqueLevels;
};

export const setStoryGenres = (stories) => {
  try {
    const storyGenres = stories.map((story) =>
      story?.topic
        ? story.topic.charAt(0).toUpperCase() + story.topic.slice(1)
        : "Unknown"
    );

    const uniqueGenres = [...new Set(storyGenres)];

    // Sort genres alphabetically
    uniqueGenres.sort();

    return uniqueGenres;
  } catch (error) {
    console.log("----setStoryGenres");
    console.log(error);
    return [];
  }
};
