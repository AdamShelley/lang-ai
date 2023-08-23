import { ScrollView, StyleSheet, Text, View } from "react-native";
import { FONT } from "../../constants/fonts";
import { SIZES } from "../../constants";

const FullTranslationBox = ({ theme, translation }) => (
  <View style={styles.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.translationText(theme)}
    >
      <Text style={styles.translation(theme)}>{translation}</Text>
    </ScrollView>
  </View>
);

export default FullTranslationBox;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padidngHorizontal: 20,
    paddingBottom: 10,
    justifyContent: "flex-end",
    height: "30%",
    width: "90%",
    alignSelf: "center",
  },
  translationText: (theme) => ({
    padding: 20,
    backgroundColor: theme.headerBackground,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#343434",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  }),

  translation: (theme) => ({
    fontSize: SIZES.medium,
    color: theme.text,
    textAlign: "justify",
    lineHeight: 28,
    fontFamily: FONT.regular,
  }),
});
