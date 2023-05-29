import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import Recommended from "./Recommended";
import AllStories from "./AllStories";
import { FONT } from "../../../constants/fonts";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import useStoriesStore from "../../../state/storiesStore";
import useDictionaryStore from "../../../state/dictionaryStore";

const home = () => {
  const router = useRouter();
  const goToUser = () => {
    router.push("/user");
  };

  const stories = useStoriesStore((state) => state.stories);
  const setStories = useStoriesStore((state) => state.setStories);
  const setWords = useDictionaryStore((state) => state.setWords);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("http://192.168.1.160:8888/api/db");
        const data = await response.json();

        if (!data) alert("No stories found");

        setStories(data);
      } catch (error) {
        return console.log(error);
      }
    };

    const fetchDictionary = async () => {
      try {
        const dictionary = await fetch("http://192.168.1.160:8888/api/def");
        const wordData = await dictionary.json();
        if (!wordData) alert("No dictionary found");
        setWords(wordData);
      } catch (error) {
        return console.log(error);
      }
    };

    fetchStories();
    fetchDictionary();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

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
            <View style={{ flex: 1 }}>
              <Recommended stories={stories} />
            </View>
          </>
        }
      />
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
