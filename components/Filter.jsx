import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FONT } from "../constants/fonts";
import { darkTheme, lightTheme } from "../constants/theme";
import useSettingsStore from "../state/store";

const Filter = ({
  text,
  size,
  color,
  onPress,
  dark,
  disabled,
  storyFilter,
}) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.container(size, color, dark, storyFilter, theme)}
    >
      <Text style={styles.text(color, disabled, theme)}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: (size, color, dark, storyFilter, theme) => ({
    padding: storyFilter ? 5 : 5,
    width: storyFilter ? "50%" : size,
    alignItems: "center",
    // backgroundColor: storyFilter ? "#212124" : "transparent",
    backgroundColor: storyFilter && theme.headerBackground,
    paddingBottom: storyFilter ? 10 : 0,
  }),
  text: (color, disabled, theme) => ({
    // color: disabled ? "#9e9797" : color,
    color: theme.text,
    fontFamily: FONT.bold,
  }),
});
