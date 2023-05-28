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
import { data } from "../../data";
import { dictionary } from "../../dictionary";
import { FONT } from "../../constants/fonts";
import { useState } from "react";
import Filter from "../../components/Filter";
import * as Haptics from "expo-haptics";
import useSettingsStore from "../../state/store";
import useStoriesStore from "../../state/storiesStore";

const Story = () => {
  const { id } = useSearchParams();
  const [shownWord, setShownWord] = useState("");
  const [wordDef, setWordDef] = useState("");
  const showPinyin = useSettingsStore((state) => state.pinyin);
  const setPinyin = useSettingsStore((state) => state.setPinyin);
  // const story = useStoriesStore((state) => state.stories);

  const stories = useStoriesStore((state) => state.stories);

  const story = stories.find((story) => story.gptId === id);

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

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setShownWord(word);

    if (word in dictionary) {
      setWordDef(dictionary[word]);
    }
  };

  const handleFilterPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPinyin();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {/* <Image
        source={{ uri: story?.image || null }}
        style={styles.image}
        alt="story-image"
      /> */}
      <Stack.Screen
        options={{
          headerTitle: `${story.title} (${story.level})`,
          headerStyle: {
            backgroundColor: "#161616",
          },
          headerTitleStyle: {
            fontSize: 24,
            fontFamily: FONT.medium,
            color: "#fff",
          },
        }}
      />

      <View style={styles.wrapper}>
        <View style={styles.translationContainer}>
          <Text style={{ color: "#fff", fontSize: 20 }}>
            {shownWord && `${shownWord} - ${wordDef.translation}`}
          </Text>
          <Text style={{ color: "#fff", fontSize: 20 }}>
            {shownWord && `${wordDef.definition} `}
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
                  <Text style={styles.pinyinText}>
                    {dictionary[word]?.pinyin}
                  </Text>
                )}
                <Text style={styles.text(shownWord === word, showPinyin)}>
                  {word}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <Filter
          text={"Pinyin"}
          color="#fff"
          size="20%"
          onPress={handleFilterPress}
        />
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
    height: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#212124",
    borderColor: "#474343",
    borderBottomWidth: 1,
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
    marginTop: 30,
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
    padding: 10,
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
});
