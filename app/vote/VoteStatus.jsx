import { Text, StyleSheet } from "react-native";
import { SIZES } from "../../constants";

const VoteStatus = ({ theme, timeLeft }) => {
  return (
    <>
      <Text style={styles.text(theme)}>
        Vote on how you want the story to progress.
      </Text>

      <Text style={styles.text(theme)}>
        Time left to submit your vote: {timeLeft}
      </Text>
    </>
  );
};

export default VoteStatus;

const styles = StyleSheet.create({
  text: (theme) => ({
    color: theme.text,
    paddingVertical: 5,
    paddingHorizontal: 2,
    marginHorizontal: 2,
    margin: 2,
    marginBottom: 0,
    fontSize: SIZES.medium,
    fontWeight: 400,
    textAlign: "center",
  }),
});
