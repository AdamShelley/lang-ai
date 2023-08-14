import { ScrollView, StyleSheet, Text, View } from "react-native";
import { FONT } from "../../constants/fonts";
import { SIZES } from "../../constants";

const FullTranslationBox = ({ theme, translation }) => (
  <View
    style={{
      height: "30%",
      paddingHorizontal: 2,
    }}
  >
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.translationText(theme, false)}
    >
      <Text style={styles.translation(theme)}>{translation}</Text>
    </ScrollView>
  </View>
);

export default FullTranslationBox;

const styles = StyleSheet.create({
  translationText: (theme, hidden) => ({
    padding: 20,
    color: "black",
    fontFamily: FONT.medium,
    marginBottom: 20,
    textAlign: hidden ? "center" : "justify",
    backgroundColor: theme.headerBackground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.text,

    // Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }),

  translation: (theme) => ({
    fontSize: SIZES.medium,
    color: theme.text,
    textAlign: "justify",
    lineHeight: 30,
  }),
});
