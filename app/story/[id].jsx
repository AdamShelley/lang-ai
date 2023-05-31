import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Redirect, Stack, useSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { FONT } from "../../constants/fonts";
import { useState } from "react";
import Filter from "../../components/Filter";
import * as Haptics from "expo-haptics";
import useSettingsStore from "../../state/store";
import useStoriesStore from "../../state/storiesStore";
import useDictionaryStore from "../../state/dictionaryStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Story = () => {
  const { id } = useSearchParams();
  const [shownWord, setShownWord] = useState("");
  const [wordDef, setWordDef] = useState("");
  const showPinyin = useSettingsStore((state) => state.pinyin);
  const setPinyin = useSettingsStore((state) => state.setPinyin);
  const stories = useStoriesStore((state) => state.stories);
  const story = stories.find((story) => story.gptId === id);
  const dictionary = useDictionaryStore((state) => state.words);

  // Check for returns
  if (!story) return <Redirect to="/" />;
  if (!story.words) return <Text>Oh dear no words array</Text>;

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
      const storiesFromStorage = await AsyncStorage.getItem("stories");
      const stories = JSON.parse(storiesFromStorage);
      stories[story.gptId].read = true;
      await AsyncStorage.setItem("stories", JSON.stringify(stories));
    };

    updateStory();
  };

  const imgJson = JSON.parse(story.image);
  const img = imgJson?.b64_json;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: img
            ? `data:image/jpeg;base64,${img}`
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
              `${shownWord.chineseWord} - ${wordDef?.englishWord || "-???-"}`}
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
            onPress={handleFinishedStory}
          />
        </View>
      </View>
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
    justifyContent: "space-between",
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
  },
});
