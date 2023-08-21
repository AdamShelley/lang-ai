import { View, Text, StyleSheet } from "react-native";
import { FONT, SIZES } from "../../../constants";
import useSettingsStore from "../../../state/store";
import { darkTheme, lightTheme } from "../../../constants/theme";

const CardContent = ({ wide, story }) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={styles.bottomSection(wide)}>
      <Text style={styles.text(wide, theme)}>
        {story.title} {story.part > 1 && `(Part ${story.part})`}
      </Text>
      {!wide && (
        <View style={styles.nonWideLevel(wide, theme)}>
          <Text
            style={[
              styles.levelText(wide, theme),
              {
                fontSize: SIZES.small,
                left: 30,
              },
            ]}
          >
            {story.level || "Unknown"}
          </Text>
          <Text style={[styles.levelText(wide, theme), { right: 30 }]}>
            {story.topic || ""}
          </Text>
        </View>
      )}

      {wide && (
        <Text style={styles.smallText(theme)} numberOfLines={3}>
          {story.synopsis}
        </Text>
      )}

      {wide && (
        <View style={styles.wideLevel}>
          <Text style={styles.levelText(wide, theme)}>
            {story.level || "Unknown"}
          </Text>
          <Text style={[styles.levelText(wide, theme)]}>
            {story.topic || ""}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CardContent;

const styles = StyleSheet.create({
  bottomSection: (wide) => ({
    backgroundColor: "transparent",
    height: wide ? "100%" : "30%",
    flexDirection: "column",
    alignItems: wide ? "flex-start" : "flex-start",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    overflow: "hidden",
    marginLeft: wide ? 10 : null,
    width: wide ? "65%" : null,
    flex: 1,
  }),
  text: (wide, theme) => ({
    color: theme.text,
    fontSize: SIZES.regular,
    fontFamily: FONT.bold,
    flexWrap: "wrap",
    flexShrink: wide ? null : 1,
    alignSelf: wide ? "flex-start" : "center",
    textAlign: wide ? "left" : "center",
    marginTop: wide ? 0 : 10,
    marginHorizontal: wide ? 0 : 10,
  }),
  smallText: (theme) => ({
    fontSize: SIZES.small,
    color: theme.text,
    marginTop: 8,
    fontFamily: FONT.regular,
    height: "100%",
    lineHeight: 15,
  }),
  nonWideLevel: (wide, theme) => ({
    width: "100%",
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 10,
  }),
  levelText: (wide, theme) => ({
    // color: theme.cardColor,
    color: wide ? "#ccc" : "#9f9e9e",
    fontSize: SIZES.xSmall,
    fontWeight: 400,
    fontFamily: FONT.bold,
    textAlign: "center",
    textTransform: "uppercase",
    opacity: 0.9,
    marginRight: wide ? 20 : 0,
  }),

  wideLevel: {
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
  },
});
