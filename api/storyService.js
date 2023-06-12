import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL_DEV } from "@env";

export const fetchStoriesFromServer = async () => {
  try {
    // Check for stories in async storage
    const storiesFromStorage = await AsyncStorage.getItem("stories");
    if (storiesFromStorage) {
      console.log("Using local storage Stories");
      const parsedStories = JSON.parse(storiesFromStorage);
      return parsedStories;
    } else {
      console.log("FETCHING STORIES FROM SERVER");
      const response = await fetch(`${URL_DEV}/db`);
      const data = await response.json();

      // Parse the word array in each story
      const newData = data.map((story) => {
        story.words = story?.words?.map((obj) => JSON.parse(obj));
        return { ...story };
      });

      // Save stories to local Storage
      await AsyncStorage.setItem("stories", JSON.stringify(newData));

      return newData;
    }
  } catch (error) {
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
      const response = await fetch(`${URL_DEV}/db/images`, {
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
      const key = story.title;
      return {
        ...story,
        imageUrl: imageMap[key],
      };
    });

    return storiesWithImages;
  } catch (error) {
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
