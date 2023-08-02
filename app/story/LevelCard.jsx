import { View, Text, StyleSheet } from "react-native";
import { FONT } from "../../constants/fonts";

const LevelCard = ({ topic, level, vote, theme }) => (
  <>
    <View style={styles.levelCard(theme, 100, 20)}>
      <Text style={styles.level(theme)}>{topic}</Text>
    </View>
    <View style={styles.levelCard(theme, 50, 130)}>
      <Text style={styles.level(theme)}>{level}</Text>
    </View>
    {vote && (
      <View style={styles.levelCard(theme, 50, 190)}>
        <Text style={styles.level(theme)}>Vote</Text>
      </View>
    )}
  </>
);

export default LevelCard;

const styles = StyleSheet.create({
  levelCard: (theme, width, left) => ({
    height: 40,
    width: width,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 20,
    left: left,
    zIndex: 5,
  }),
  level: (theme) => ({
    fontSize: 12,
    fontFamily: FONT.bold,
    color: "#212121",
    textTransform: "uppercase",
    letterSpacing: 0.2,
  }),
});
