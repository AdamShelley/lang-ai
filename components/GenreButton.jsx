import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FONT } from "../constants/fonts";

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
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 20,
    marginHorizontal: 2,
    backgroundColor: color,
  }),
  text: (color) => ({
    color: "#fff",
    fontSize: 12,
    fontFamily: FONT.bold,
    textAlign: "center",
  }),
});
