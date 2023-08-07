import AsyncStorage from "@react-native-async-storage/async-storage";
import { LIVE_URL } from "@env";
import { fetchDataFromServer } from "./dataService";

export const fetchStoriesFromServer = async (forceFetch = false) => {
  const stories = await fetchDataFromServer("db", "stories", forceFetch);

  try {
    if (stories) {
      // Parse the word array in each story if its not parsed correctly
      const newData = stories.map((story) => {
        story.words = story?.words?.map((obj) =>
          typeof obj === "string" ? JSON.parse(obj) : obj
        );
        return { ...story };
      });

      return newData;
    }
  } catch (error) {
    console.log(error);
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
