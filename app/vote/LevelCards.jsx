import { View, Text, StyleSheet } from "react-native";
import { FONT, SIZES } from "../../constants";

const LevelCards = ({ level, title }) => (
  <>
    <View style={styles.levelCard(false)}>
      <Text style={styles.level}>{level}</Text>
    </View>
    <View style={styles.levelCard(true)}>
      <Text style={styles.level}>{title}</Text>
    </View>
  </>
);

export default LevelCards;

const styles = StyleSheet.create({
  levelCard: (title) => ({
    height: 40,
    width: title ? "50%" : 50,
    minWidth: title ? 100 : 50,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 20,
    left: title ? 100 : 20,
    zIndex: 5,
    paddingHorizontal: 5,
  }),
  level: {
    fontSize: SIZES.small,
    fontFamily: FONT.bold,
    color: "#212124",
    textTransform: "uppercase",
    textAlign: "center",
  },
});
