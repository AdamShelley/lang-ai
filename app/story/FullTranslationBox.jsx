import { ScrollView, StyleSheet, Text } from "react-native";
import { FONT } from "../../constants/fonts";

const FullTranslationBox = ({ theme, translation }) => (
  <ScrollView contentContainerStyle={styles.translationText(theme, false)}>
    <Text style={styles.translationText(theme, false)}>{translation}</Text>
  </ScrollView>
);

export default FullTranslationBox;

const styles = StyleSheet.create({
  translationText: (theme, hidden) => ({
    padding: 20,
    color: theme.text,
    fontSize: 16,
    lineHeight: 30,
    fontFamily: FONT.medium,
    marginBottom: 20,
    textAlign: hidden ? "center" : "justify",
  }),
});
