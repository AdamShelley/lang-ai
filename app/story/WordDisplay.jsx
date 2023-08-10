import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { FONT } from "../../constants/fonts";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { SIZES } from "../../constants";

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
}) => (
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
            <Text style={styles.pinyinText(theme)}>{word.pinyin}</Text>
          )}
          <View
            style={styles.textWrapper(shownWord === word, showPinyin, theme)}
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
  </ScrollView>
);

export default WordDisplay;

const styles = StyleSheet.create({
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
  textWrapper: (shownWord, showPinyin, theme) => ({
    borderWidth: 1,
    borderRadius: 10,
    marginTop: showPinyin ? 0 : 17,
    borderColor: shownWord ? theme.cardColor : "transparent",
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
    marginBottom: 20,
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
