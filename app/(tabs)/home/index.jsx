import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FONT } from "../../../constants/fonts";
import Recommended from "./Recommended";
import AllStories from "./AllStories";
import { URL_DEV, LOCAL_HOST } from "@env";

import useStoriesStore from "../../../state/storiesStore";
import useDictionaryStore from "../../../state/dictionaryStore";
import { ActivityIndicator } from "react-native";
import { useLocalStorage } from "../../../utils/useLocalStorage";

const home = () => {
  const router = useRouter();
  const { localStories, getLocalStore } = useLocalStorage();
  const [images, setImages] = useState([]);
  const goToUser = () => {
    router.push("/user");
  };

  const stories = useStoriesStore((state) => state.stories);
  const setStories = useStoriesStore((state) => state.setStories);
  const setWords = useDictionaryStore((state) => state.setWords);
  const setLocalStorageStories = useStoriesStore(
    (state) => state.setLocalStorageStories
  );

  useEffect(() => {
    const fetchStories = async () => {
      try {
        // Check for stories in async storage
        const storiesFromStorage = await AsyncStorage.getItem("stories");
        if (storiesFromStorage) {
          console.log("Using local storage Stories");
          const parsedStories = JSON.parse(storiesFromStorage);
          setStories(parsedStories);
          return;
        } else {
          console.log("FETCHING STORIES OMGGGGG");
          const response = await fetch(`${URL_DEV}/db`);
          const data = await response.json();

          // Parse the word array in each story
          // remove the img data (Too big for local storage) - Check no longer required
          const newData = data.map((story) => {
            story.words = story?.words?.map((obj) => JSON.parse(obj));
            return { ...story, image: "" };
          });

          // Save stories to local Storage & state
          const storiesWithImages = await fetchImages(newData);
          setStories(storiesWithImages);
          await AsyncStorage.setItem(
            "stories",
            JSON.stringify(storiesWithImages)
          );
        }
      } catch (error) {
        return console.log(error);
      }
    };

    const fetchDictionary = async () => {
      // Check if a dictionary is already in the async storage
      const dictionaryFromStorage = await AsyncStorage.getItem("dictionary");
      if (dictionaryFromStorage) {
        console.log("Using local storage Dict");
        setWords(JSON.parse(dictionaryFromStorage));
        return;
      } else {
        try {
          const dictionary = await fetch(`${URL_DEV}/def`);
          const wordData = await dictionary.json();

          // Save the dictionary to local storage
          await AsyncStorage.setItem("dictionary", JSON.stringify(wordData));

          // Set State
          setWords(wordData);
        } catch (error) {
          return console.log(error);
        }
      }
    };

    fetchStories();
    fetchDictionary();
  }, []);

  const fetchImages = async (stories, batchSize = 5) => {
    // Check for images in async storage
    const imagesFromStorage = await AsyncStorage.getItem("images");
    if (imagesFromStorage) {
      console.log("Using local storage Images");
      console.log(imagesFromStorage);
      setImages(JSON.parse(imagesFromStorage));
      return;
    }

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

    console.log(storiesWithImages);

    setImages(imageUrls);

    // Save images to local Storage
    await AsyncStorage.setItem("images", JSON.stringify(imageUrls));

    return storiesWithImages;
  };

  // Just for dev purposes
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    alert("Storage cleared");
    console.log("Done.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {stories ? (
        <AllStories
          stories={stories}
          ListHeaderComponent={
            <>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text style={styles.title}>Home</Text>
                <TouchableOpacity style={styles.circle} onPress={goToUser}>
                  <Text style={styles.text}>AS</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 11 }}>
                <TouchableOpacity onPress={clearAll}>
                  <Text style={{ color: "red", padding: 5 }}>
                    Clear Storage
                  </Text>
                </TouchableOpacity>
                <Recommended stories={stories} />
              </View>
            </>
          }
        />
      ) : (
        <ActivityIndicator color="#fff" size="large" />
      )}
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    paddingTop: 40,
    fontFamily: FONT.medium,
    fontSize: 30,
    fontWeight: 100,
    fontWeight: "medium",
    color: "#fff",
    paddingHorizontal: 20,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#474750",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    marginTop: 30,
  },
  text: {
    color: "#e6e6e6",
  },
});
