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

const Story = () => {
  const router = useRouter();
  const { id } = useSearchParams();
  const [shownWord, setShownWord] = useState("");
  const [wordDef, setWordDef] = useState("");
  const [showTranslation, setShowTranslation] = useState(false);
  const showPinyin = useSettingsStore((state) => state.pinyin);
  const setPinyin = useSettingsStore((state) => state.setPinyin);
  const stories = useStoriesStore((state) => state.stories);
  const setStories = useStoriesStore((state) => state.setStories);

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

  const dictionary = useDictionaryStore((state) => state.words);
  if (!dictionary) useDictionary();

  // Button functionality
  const showWord = (e, word) => {
    // If word is puntionation, don't do anything
    if (
      word === "." ||
      word === "," ||
      word === "!" ||
      word === "?" ||
      word === "。" ||
      word === "，"
    ) {
      setShownWord("");
      setWordDef("");
      return;
    }

    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setShownWord(word);

    if (word.chineseWord in dictionary) {
      setWordDef(dictionary[word.chineseWord]);
    }
  };

  const handleFilterPress = () => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPinyin();
  };

  const handleFinishedStory = () => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Get entry out of local storage and update it with read:true
    const updateStory = async () => {
      try {
        const storiesFromStorage = await AsyncStorage.getItem("stories");

        if (!storiesFromStorage) throw new Error("No Stories in storage");

        const stories = JSON.parse(storiesFromStorage);

        // Find the story clicked and update it to read
        const foundStory = stories.find((s) => s.gptId === story.gptId);

        if (!foundStory) throw new Error("No story found");

        foundStory.read = true;
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
              headerTitle: `${story.title} (${story.level})`,
              headerStyle: {
                backgroundColor: "#161616",
              },
              headerTintColor: "#eee",
              headerTitleStyle: {
                fontSize: 20,
                fontFamily: FONT.medium,
                color: "#eee",
              },
            }}
          />

          <View style={styles.wrapper}>
            <View style={styles.translationContainer}>
              <Text style={{ color: "#fff", fontSize: 20 }}>
                {shownWord &&
                  `${shownWord.chineseWord} - ${
                    wordDef?.englishWord || "-???-"
                  }`}
              </Text>
              <Text style={{ color: "#fff", fontSize: 20 }}>
                {shownWord && `${wordDef?.definition || ""} `}
              </Text>
            </View>

            <ScrollView
              horizontal={false}
              contentContainerStyle={styles.wordWrapper}
            >
              {story.words.map((word, index) => (
                <Pressable
                  onPressIn={(e) => showWord(e, word)}
                  onPressOut={() => {
                    setShownWord("");
                    setWordDef("");
                  }}
                  key={`${word}-${index}`}
                >
                  <View>
                    {showPinyin && (
                      <Text style={styles.pinyinText}>{word.pinyin}</Text>
                    )}
                    <Text style={styles.text(shownWord === word, showPinyin)}>
                      {word.chineseWord}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>

            {showTranslation ? (
              <Pressable
                style={styles.fullTranslation}
                onPress={() => setShowTranslation(false)}
              >
                <Text style={styles.translationText((hidden = false))}>
                  {story.translation}
                </Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.fullTranslation}
                onPress={() => setShowTranslation(true)}
              >
                <Text style={styles.translationText((hidden = true))}>
                  Tap to see translation
                </Text>
              </Pressable>
            )}

            <View style={styles.buttonContainer}>
              <Filter
                text={"Pinyin"}
                color="#fff"
                size="30%"
                storyFilter
                onPress={handleFilterPress}
              />
              <Filter
                text={"Finish"}
                color="#fff"
                size="30%"
                storyFilter
                // disabled={localStorageMatch?.read}
                onPress={handleFinishedStory}
              />
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Story;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#212124",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    position: "absolute",
    opacity: 0.1,
  },

  translationContainer: {
    height: 80,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#1616169a",
    backgroundColor: "transparent",
    opacity: 0.8,
    zIndex: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#212121",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  wrapper: {
    width: "100%",
    height: "100%",
  },
  wordWrapper: {
    width: "100%",
    marginTop: 10,
    paddingBottom: 100,
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: "10%",
  },
  title: {
    marginTop: 10,
    color: "#fff",
    fontSize: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 50,
    fontFamily: FONT.medium,
  },
  text: (shownWord, showPinyin) => ({
    color: "#e6e6e6",
    paddingVertical: 10,
    paddingHorizontal: 2,
    margin: 2,
    letterSpacing: 10,
    marginTop: showPinyin ? 0 : 17,
    marginBottom: 0,
    fontSize: 30,
    fontWeight: 400,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: shownWord ? "#464646" : "transparent",
    backgroundColor: shownWord ? "#464646" : "transparent",
  }),
  pinyinText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  fullTranslation: {
    width: "100%",
    marginTop: 20,
    paddingTop: 20,
    paddingHorizontal: "10%",
    borderTopColor: "#00000013",
    borderTopWidth: 1,
    backgroundColor: "#00000013",
  },
  translationText: (hidden) => ({
    color: "#fff",
    fontSize: 20,
    lineHeight: 30,
    fontFamily: FONT.regular,
    marginBottom: 20,
    textAlign: hidden ? "center" : "justify",
  }),
});
