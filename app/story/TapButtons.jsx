import { View, StyleSheet, Platform } from "react-native";
import Filter from "../../components/Filter";

const TapButtons = ({
  theme,
  story,
  handleFilterPress,
  handleFinishedStory,
  setShowTranslation,
}) => (
  <View style={styles.buttonContainer(theme)}>
    <Filter
      text={"Translation"}
      color="#e6e6e6"
      onPress={() => setShowTranslation((prev) => !prev)}
    />

    <Filter text={"Pinyin"} color="#e6e6e6" onPress={handleFilterPress} />

    <Filter
      text={story.read ? "Mark as unread" : "Mark as read"}
      color="#e6e6e6"
      onPress={handleFinishedStory}
    />
  </View>
);

export default TapButtons;

const styles = StyleSheet.create({
  buttonContainer: (theme) => ({
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-evenly",
    backgroundColor: theme.headerBackground,
    paddingBottom: Platform.OS !== "ios" ? 20 : 0,
  }),
});
