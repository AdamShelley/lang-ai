import { Pressable, Text, StyleSheet } from "react-native";
import { FONT, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";

const GenreButton = ({ text, size, color, onPress, deletion }) => {
  return (
    <Pressable onPress={onPress} style={styles.container(size, color)}>
      <Text style={styles.text}>{text}</Text>
      {deletion && (
        <Ionicons
          name="ios-close-circle"
          size={16}
          color="white"
          style={{ marginLeft: 10 }}
        />
      )}
    </Pressable>
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

    // Box Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 6,
  }),
  text: {
    color: "#fff",
    fontSize: SIZES.small,
    fontFamily: FONT.bold,
    textAlign: "center",
  },
});
