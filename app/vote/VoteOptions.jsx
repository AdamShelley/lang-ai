import { View, StyleSheet } from "react-native";
import { Option } from "./Option";

const VoteOptions = ({
  story,
  theme,
  submitted,
  handleOptionChoice,
  selectedOption,
}) => (
  <View style={styles.optionsContainer(theme)}>
    {!story.voted ? (
      story.options.map((option, index) => (
        <Option
          key={index}
          option={option}
          index={index}
          handleOptionChoice={handleOptionChoice}
          selectedOption={selectedOption}
          submitted={submitted}
          disabled={story.voted}
          theme={theme}
        />
      ))
    ) : (
      <Option
        key={story.votedOption}
        index={story.votedOption}
        option={story.options[story.votedOption]}
        selectedOption={story.votedOption}
        submitted={submitted}
        theme={theme}
        disabled
      />
    )}
  </View>
);

export default VoteOptions;

const styles = StyleSheet.create({
  optionsContainer: (theme) => ({
    flex: 1,
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    maxHeight: "50%",
  }),
});
