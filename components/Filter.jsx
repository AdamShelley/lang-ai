import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FONT } from "../constants/fonts";
import { darkTheme, lightTheme } from "../constants/theme";
import useSettingsStore from "../state/store";

const Filter = ({ text, size, onPress, disabled }) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.container(size, theme)}
    >
      <Text style={styles.text(theme)}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: (size, theme) => ({
    padding: 5,
    width: size,
    alignItems: "center",
    backgroundColor: theme.headerBackground,
    paddingTop: 10,
    paddingBottom: 0,
  }),
  text: (theme) => ({
    color: theme.text,
    fontFamily: FONT.bold,
  }),
});
