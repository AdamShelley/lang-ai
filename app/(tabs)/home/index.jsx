import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FONT } from "../../../constants/fonts";
import Recommended from "./Recommended";
import AllStories from "./AllStories";

import useStoriesStore from "../../../state/storiesStore";
import useDictionaryStore from "../../../state/dictionaryStore";
import { ActivityIndicator } from "react-native";
import { useLocalStorage } from "../../../utils/useLocalStorage";

const home = () => {
  const router = useRouter();
  const { localStories, getLocalStore } = useLocalStorage();
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
        const response = await fetch("http://192.168.1.160:8888/api/db");
        const data = await response.json();

        data.map(
          (story) => (story.words = story.words.map((obj) => JSON.parse(obj)))
        );

        setStories(data);

        // Check if stories are already saved to local storage
        const storiesFromStorage = await AsyncStorage.getItem("stories");

        if (storiesFromStorage) return;

        // Save the story ID's to local storage
        let storiesForStorage = data.reduce((acc, story) => {
          acc[story.gptId] = {
            title: story.title,
            read: false,
          };
          return acc;
        }, {});

        console.log("Saving Stories to local storage");

        await AsyncStorage.setItem(
          "stories",
          JSON.stringify(storiesForStorage)
        );
      } catch (error) {
        return console.log(error);
      }
    };

    const fetchDictionary = async () => {
      try {
        const dictionary = await fetch("http://192.168.1.160:8888/api/def");
        const wordData = await dictionary.json();

        setWords(wordData);
      } catch (error) {
        return console.log(error);
      }
    };

    fetchStories();
    fetchDictionary();
  }, []);

  // Get local storage stories from asyncstorage
  const fetchStories = async () => {
    const storageStories = await getLocalStore("stories");
    setLocalStorageStories(storageStories);
  };

  useEffect(() => {
    fetchStories();
  }, []);

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
