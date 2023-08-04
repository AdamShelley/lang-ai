import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FONT, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";

const GenreButton = ({ text, size, color, onPress, deletion }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container(size, color)}>
      {deletion && <Ionicons name="ios-close-circle" size={16} color="white" />}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default GenreButton;

const styles = StyleSheet.create({
  container: (size, color) => ({
    padding: 10,
    width: size,
    height: 40,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 2,
    backgroundColor: color,
    borderWidth: 1,
    borderColor: "#ffffff15",
  }),
  text: {
    color: "#fff",
    fontSize: SIZES.small,
    fontFamily: FONT.bold,
    textAlign: "center",
    marginLeft: 5,
  },
});
