import { StyleSheet, Text } from "react-native";
import { FONT, SIZES } from "../../constants";

const VoteSynopsis = ({ theme, synopsis }) => (
  <Text style={styles.synopsis(theme)} numberOfLines={3}>
    Story so far: {synopsis}
  </Text>
);

export default VoteSynopsis;

const styles = StyleSheet.create({
  synopsis: (theme) => ({
    color: theme.text,
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    width: "80%",
    alignSelf: "center",
    textAlign: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
    lineHeight: 25,
    marginTop: 90,
  }),
});
