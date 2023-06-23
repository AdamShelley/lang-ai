import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Redirect, Stack, useRouter, useSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { FONT } from "../../constants/fonts";
import { useEffect, useState } from "react";
import Filter from "../../components/Filter";
import * as Haptics from "expo-haptics";
import useSettingsStore from "../../state/store";
import useStoriesStore from "../../state/storiesStore";
import useDictionaryStore from "../../state/dictionaryStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useDictionary from "../../hooks/useDictionary";

const Vote = () => {
  const router = useRouter();
  const { id } = useSearchParams();
  const stories = useStoriesStore((state) => state.stories);
  const [story, setStory] = useState();

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
      const response = await fetch(`http://192.168.1.160:8888/api/db/${id}`);
      const data = await response.json();
      data[0].words = data[0].words.map((obj) => JSON.parse(obj));
      setStory(data[0]);
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
            <View style={styles.levelCard}>
              <Text style={styles.level}>{story.level}</Text>
            </View>

            <ScrollView
              horizontal={false}
              contentContainerStyle={styles.wordWrapper}
            >
              <Text style={styles.synopsis}>{story.synopsis}</Text>
              <View>
                <Text style={styles.text}>
                  Vote on how you want the story to progress.
                </Text>
                <View style={styles.optionsContainer}>
                  {story.options.map((option, index) => (
                    <Pressable
                      style={styles.option}
                      key={index}
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        // router.push(`/vote/${option.gptId}`);
                      }}
                    >
                      <Text style={styles.text}>{option}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
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
  levelCard: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 5,
  },
  level: {
    fontSize: 12,
    fontFamily: FONT.medium,
    color: "#212124",
    textTransform: "uppercase",
  },
  synopsis: {
    color: "#fff",
    fontSize: 16,
    fontFamily: FONT.regular,
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
    marginVertical: 20,
    lineHeight: 25,
    marginTop: 100,
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
    fontSize: 14,
    fontWeight: 400,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    width: "100%",
    height: "100%",
  },
  option: {
    width: "30%",
    color: "#e6e6e6",
    height: 100,
    paddingVertical: 5,
    paddingHorizontal: 2,
    marginHorizontal: 2,
    margin: 2,
    marginBottom: 0,
    fontSize: 10,
    fontWeight: 400,
  },
});
