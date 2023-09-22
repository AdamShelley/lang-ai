import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { FONT } from "../../constants/fonts";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { SIZES } from "../../constants";
import useSettingsStore from "../../state/store";
import useDictionaryStore from "../../state/dictionaryStore";
import { useRouter } from "expo-router";

const WordDisplay = ({
  story,
  theme,
  fontSize,
  modifiedWords,
  showWord,
  shownWord,
  showPinyin,
  setShownWord,
  setWordDef,
  goToVotePage,
}) => {
  const router = useRouter();
  const textSize = useSettingsStore((state) => state.textSize);
  const dictionary = useDictionaryStore((state) => state.words);
  // Choose padding required for text size
  const paddingMapping = {
    small: 16,
    medium: 17,
    large: 18,
  };

  const paddingSize = paddingMapping[textSize] || 17;

  // Route to report page
  const handleReportPress = () => {
    router.push(`/report/${story.gptId}`);
  };

  return (
    <ScrollView horizontal={false} contentContainerStyle={styles.wordWrapper}>
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
                {word?.pinyin || dictionary[word.chineseWord]?.pinyin}
              </Text>
            )}
            <View
              style={styles.textWrapper(
                shownWord === word,
                showPinyin,
                theme,
                paddingSize
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
      {story.options && !story.vote_finished && story.part < 10 && (
        <View style={styles.textWrapper(showPinyin, theme, paddingSize)}>
          <Text style={styles.text(fontSize, theme)}>To be continued.</Text>
        </View>
      )}

      {story.options && !story.vote_finished && (
        <Pressable onPress={goToVotePage} style={styles.voteButton(theme)}>
          {story.voted ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="done" size={SIZES.medium} color="black" />
              <Text
                style={{
                  marginLeft: 10,
                  color: theme.black,
                  fontFamily: FONT.medium,
                }}
              >
                You have voted already
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5
                name="vote-yea"
                size={SIZES.medium}
                color={theme.background}
              />
              <Text
                style={{
                  marginLeft: 10,
                  color: theme.black,
                  fontFamily: FONT.medium,
                }}
              >
                Vote on the next stage of the story
              </Text>
            </View>
          )}
        </Pressable>
      )}
      {/* Button to go to report problem page */}
      <View style={{ width: "100%", marginTop: 50 }}>
        <Pressable onPress={handleReportPress} style={{ width: "100%" }}>
          <Text
            style={{
              color: theme.text,
              fontFamily: FONT.medium,
              fontSize: 16,
              textAlign: "left",
              marginTop: 10,
              color: "#FFA500",
            }}
          >
            Report a problem
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default WordDisplay;

const styles = StyleSheet.create({
  wordWrapper: {
    width: "100%",
    marginTop: 10,
    paddingBottom: 100,
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: "5%",
  },
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
  textWrapper: (shownWord, showPinyin, theme, padding) => ({
    borderRadius: 10,

    marginTop: showPinyin ? 0 : padding,
    backgroundColor: shownWord ? theme.background : "transparent",
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
  voteButton: (theme) => ({
    width: "100%",
    height: 60,
    backgroundColor: "#FFA500",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    // marginBottom: 20,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
  }),
});
