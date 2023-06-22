import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FONT } from "../constants/fonts";

const Filter = ({
  text,
  size,
  color,
  onPress,
  dark,
  disabled,
  storyFilter,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.container(size, color, dark, storyFilter)}
    >
      <Text style={styles.text(color, disabled)}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: (size, color, dark, storyFilter) => ({
    padding: storyFilter ? 5 : 5,
    width: storyFilter ? "50%" : size,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: storyFilter ? "transparent" : "#212121",
    alignItems: "center",
    backgroundColor: "transparent",
    // marginTop: 20,
    // paddingHorizontal: 20,
    backgroundColor: storyFilter ? "#212124" : "transparent",
  }),
  text: (color, disabled) => ({
    color: disabled ? "#9e9797" : color,
    fontFamily: FONT.bold,
  }),
});
