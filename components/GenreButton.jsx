import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FONT, SIZES } from "../constants";

const GenreButton = ({ text, size, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container(size, color)}>
      <Text style={styles.text(color)}>{text}</Text>
    </TouchableOpacity>
  );
};

export default GenreButton;

const styles = StyleSheet.create({
  container: (size, color) => ({
    padding: 10,
    width: size,
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 2,
    backgroundColor: color,
  }),
  text: (color) => ({
    color: "#fff",
    fontSize: SIZES.small,
    fontFamily: FONT.bold,
    textAlign: "center",
  }),
});
