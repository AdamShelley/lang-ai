import { View, Text, StyleSheet } from "react-native";
import { FONT, SIZES } from "../../../constants";
import useSettingsStore from "../../../state/store";
import { darkTheme, lightTheme } from "../../../constants/theme";

const CardContent = ({ wide, story }) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={styles.bottomSection(wide)}>
      {!wide && (
        <View style={styles.nonWideLevel(wide, theme)}>
          <Text
            style={[
              styles.levelText(theme),
              {
                fontSize: SIZES.small,
              },
            ]}
          >
            {story.level || "Unknown"}
          </Text>
        </View>
      )}

      <Text style={styles.text(wide, theme)}>
        {story.title} {story.part > 1 && `Part ${story.part}`}
      </Text>
      {wide && (
        <Text style={styles.smallText(theme)} numberOfLines={3}>
          {story.synopsis}
        </Text>
      )}
    </View>
  );
};

export default CardContent;

const styles = StyleSheet.create({
  bottomSection: (wide) => ({
    height: wide ? "100%" : "30%",
    padding: 10,
    flexDirection: "column",
    alignItems: wide ? "flex-start" : "flex-start",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    overflow: "hidden",
    marginLeft: wide ? 10 : null,
    width: wide ? "65%" : null,
    flex: 1,
  }),
  nonWideLevel: (wide, theme) => ({
    borderRadius: 20,
    borderWidth: theme === lightTheme ? 0 : 1,
    borderColor: wide ? "#313131" : "transparent",
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: theme.text,
    alignSelf: wide ? "auto" : "center",
    position: wide ? "absolute" : "relative",
    left: wide ? 10 : null,
    right: wide ? 10 : null,
    bottom: wide ? 1 : null,
    textAlign: "center",
    fontFamily: FONT.medium,
    textTransform: "uppercase",
  }),
  text: (wide, theme) => ({
    color: theme.text,
    fontSize: SIZES.regular,
    fontFamily: FONT.bold,
    flexWrap: "wrap",
    flexShrink: wide ? null : 1,
    marginTop: wide ? 0 : 15,
    alignSelf: wide ? "flex-start" : "center",
    textAlign: wide ? "left" : "center",
  }),
  smallText: (theme) => ({
    fontSize: SIZES.small,
    color: theme.text,
    marginTop: 8,
    marginRight: 5,
    fontFamily: FONT.regular,
    height: "100%",
  }),
  levelText: (theme) => ({
    color: theme.cardColor,
    fontSize: SIZES.medium,
    fontWeight: 400,
    fontFamily: FONT.bold,
    textAlign: "center",
    alignSelf: "center",
    textTransform: "uppercase",
  }),
});
