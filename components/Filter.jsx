import { Pressable, Text, StyleSheet } from "react-native";
import { FONT, SIZES } from "../constants";
import { darkTheme, lightTheme } from "../constants/theme";
import useSettingsStore from "../state/store";

const Filter = ({ text, size, onPress, disabled }) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={styles.container(size, theme)}
      pressRetentionOffset={100}
      hitSlop={20}
    >
      <Text style={styles.text(theme)}>{text}</Text>
    </Pressable>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: (size, theme) => ({
    // padding: 10,
    width: size,
    alignItems: "center",
    backgroundColor: theme.headerBackground,
    paddingTop: 10,
    paddingBottom: 0,
    borderRadius: 15,
    marginHorizontal: 30,
  }),
  text: (theme) => ({
    color: theme.text,
    fontFamily: FONT.medium,
    fontSize: SIZES.regular,
  }),
});
