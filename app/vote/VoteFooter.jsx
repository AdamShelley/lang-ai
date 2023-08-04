import { Text, StyleSheet } from "react-native";
import SubmitButton from "./SubmitButton";

const VoteFooter = ({
  handleVoteSubmission,
  story,
  theme,
  error,
  submitted,
}) => {
  return (
    <>
      {story.voted ||
        (!submitted && <SubmitButton onPress={handleVoteSubmission} />)}
      {story.voted && (
        <Text style={{ ...styles.text(theme), marginBottom: 50 }}>
          Thanks, your vote has been cast!
        </Text>
      )}
      {error && <Text style={styles.text(theme)}>Oh dear - {error}</Text>}
    </>
  );
};

export default VoteFooter;

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
