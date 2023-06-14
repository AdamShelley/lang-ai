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
    padding: storyFilter ? 10 : 5,
    width: size,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: storyFilter ? "#696464" : "#212121",
    alignItems: "center",
    backgroundColor: "#212121",
    marginTop: 20,
  }),
  text: (color, disabled) => ({
    color: disabled ? "#9e9797" : color,
    fontFamily: FONT.bold,
  }),
});
