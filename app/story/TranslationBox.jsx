import { View, Text, StyleSheet } from "react-native";
import { SIZES } from "../../constants";

const TranslationBox = ({ theme, shownWord, wordDef }) => {
  return (
    <View style={styles.translationContainer}>
      <View style={{ padding: 5 }}>
        <Text
          style={{
            fontWeight: 600,
            color: theme.text,
            fontSize: SIZES.medium,
            textAlign: "center",
          }}
        >
          {shownWord && `${shownWord.chineseWord}   ${shownWord.pinyin}`}
        </Text>
        <Text
          style={{
            fontWeight: 600,
            color: theme.text,
            fontSize: 20,
            marginTop: 10,
            textAlign: "center",
          }}
        >
          {shownWord && `${wordDef?.englishWord || wordDef?.definition || ""}`}
        </Text>
      </View>
    </View>
  );
};

export default TranslationBox;

const styles = StyleSheet.create({
  translationContainer: {
    marginTop: 60,
    paddingTop: 40,
    marginBottom: 30,
    height: 80,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    opacity: 0.8,
    zIndex: 5,
  },
});
