import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
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
import { darkTheme, lightTheme } from "../../constants/theme";

// Dev
import { URL_DEV } from "@env";

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
  const textSize = useSettingsStore((state) => state.textSize);
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const [story, setStory] = useState();

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

  useEffect(() => {
    if (!stories.length) {
      getStoryFromAsyncStorage(id);
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

  const dictionary = useDictionaryStore((state) => state.words);
  if (!dictionary) useDictionary();

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

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setShownWord(word);

    if (word.chineseWord in dictionary) {
      setWordDef(dictionary[word.chineseWord]);
      // Capitalzie first letter of english word
      wordDef?.englishWord?.charAt(0)?.toUppercase() +
        wordDef?.englishWord?.slice(1);
    }
  };

  const handleFilterPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPinyin();
  };

  const handleFinishedStory = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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

  const goToVotePage = () => {
    router.push(`/vote/${id}`);
  };

  return (
    <SafeAreaView style={styles.container(theme)}>
      <StatusBar style="dark" />
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
              headerTitle: `${story.title}`,

              headerStyle: {
                backgroundColor: theme.headerBackground,
              },
              headerTintColor: theme.text,
              headerTitleStyle: {
                fontSize: 16,
                fontFamily: FONT.medium,
                color: theme.text,
              },
            }}
          />

          <View style={styles.wrapper}>
            <View style={styles.levelCard(theme, 100, 20)}>
              <Text style={styles.level(theme)}>{story.topic}</Text>
            </View>
            <View style={styles.levelCard(theme, 50, 130)}>
              <Text style={styles.level(theme)}>{story.level}</Text>
            </View>
            {story.options && (
              <View style={styles.levelCard(theme, 50, 190)}>
                <Text style={styles.level(theme)}>Vote</Text>
              </View>
            )}

            <View style={styles.translationContainer}>
              <Text style={{ color: theme.text, fontSize: 20 }}>
                {shownWord &&
                  `${shownWord.chineseWord} - ${wordDef?.englishWord || ""}`}
              </Text>
              {/* <Text style={{ color: "#fff", fontSize: 20 }}>
                {shownWord && `${wordDef?.definition || ""} `}
              </Text> */}
            </View>

            <ScrollView
              horizontal={false}
              contentContainerStyle={styles.wordWrapper}
            >
              <Text style={styles.synopsis(theme)}>{story.synopsis}</Text>
              {modifiedWords.map((word, index) => (
                <Pressable
                  onPressIn={(e) => showWord(e, word)}
                  onPressOut={() => {
                    setShownWord("");
                    setWordDef("");
                  }}
                  key={`${word}-${index}`}
                >
                  <View style={{ textAlign: "center" }}>
                    {showPinyin && (
                      <Text style={styles.pinyinText(theme)}>
                        {word.pinyin}
                      </Text>
                    )}
                    <View
                      style={styles.textWrapper(
                        shownWord === word,
                        showPinyin,
                        theme
                      )}
                    >
                      <Text
                        style={
                          /^[\p{Punctuation}]+$/u.test(word.chineseWord)
                            ? styles.punctuation(showPinyin)
                            : styles.text(fontSize, theme)
                        }
                      >
                        {word.chineseWord}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}

              {story.options && (
                <Pressable onPress={goToVotePage} style={styles.voteButton}>
                  <Text style={{ color: "#fff" }}>
                    {story.voted
                      ? "You have voted already"
                      : "Vote on the next stage of the story!"}
                  </Text>
                </Pressable>
              )}
            </ScrollView>
            {/* style={styles.translationText(theme, false) */}

            {showTranslation && (
              <ScrollView
                contentContainerStyle={styles.translationText(theme, false)}
              >
                <Text style={styles.translationText(theme, false)}>
                  {story.translation}
                </Text>
              </ScrollView>
            )}

            <View style={styles.buttonContainer(theme)}>
              <Filter
                text={"Pinyin"}
                color="#e6e6e6"
                onPress={handleFilterPress}
              />
              <Filter
                text={"Translation"}
                color="#e6e6e6"
                onPress={() => setShowTranslation(!showTranslation)}
              />
              <Filter
                text={story.read ? "Mark as unread" : "Mark as read"}
                color="#e6e6e6"
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
  container: (theme) => ({
    flex: 1,
    backgroundColor: theme.headerBackground,
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  }),
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

  levelCard: (theme, width, left) => ({
    height: 40,
    width: width,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 20,
    left: left,
    zIndex: 5,
  }),
  level: (theme) => ({
    fontSize: 12,
    fontFamily: FONT.bold,
    color: "#212121",
    textTransform: "uppercase",
    letterSpacing: 0.2,
  }),
  synopsis: (theme) => ({
    color: theme.text,
    fontSize: 16,
    fontFamily: FONT.regular,
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
    marginVertical: 20,
    lineHeight: 25,
  }),

  translationContainer: {
    marginTop: 60,
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
    width: "95%",
    marginTop: 10,
    paddingBottom: 100,
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: "5%",
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
  textWrapper: (shownWord, showPinyin, theme) => ({
    borderWidth: 1,
    borderRadius: 10,
    marginTop: showPinyin ? 0 : 17,
    borderColor: shownWord ? "#414141" : "transparent",
    backgroundColor: shownWord ? "#414141" : "transparent",
  }),
  text: (fontSize, theme) => ({
    color: theme.text,

    paddingVertical: 5,
    paddingHorizontal: 2,
    marginHorizontal: 2,
    margin: 2,
    marginBottom: 0,
    fontSize: fontSize,
    fontWeight: 400,
  }),
  pinyinText: (theme) => ({
    color: theme.text,
    fontSize: 14,
    textAlign: "center",
  }),
  buttonContainer: (theme) => ({
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-evenly",

    backgroundColor: theme.headerBackground,
  }),
  fullTranslation: (theme) => ({
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: "10%",
    backgroundColor: theme.headerBackground,
  }),
  translationText: (theme, hidden) => ({
    padding: 20,
    color: theme.text,
    fontSize: 16,
    lineHeight: 30,
    fontFamily: FONT.medium,
    marginBottom: 20,
    textAlign: hidden ? "center" : "justify",
  }),
  punctuation: (showPinyin) => ({
    color: "#e6e6e6",
    marginTop: showPinyin ? 0 : 17,
    marginBottom: 0,
    fontSize: 20,
    fontWeight: 400,
    borderColor: "transparent",
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    paddingVertical: 0,
  }),
  voteButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#323232",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    marginBottom: 20,
    borderRadius: 5,
  },
});
