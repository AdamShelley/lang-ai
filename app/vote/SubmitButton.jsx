import { Pressable, StyleSheet, Text } from "react-native";
import { FONT, SIZES } from "../../constants";

const SubmitButton = ({ onPress, selectedOption }) => (
  <Pressable
    style={({ pressed }) => [
      {
        backgroundColor: pressed ? "rgba(0, 0, 0, 0.3)" : "#464646",
      },
      styles.submitButton,
    ]}
    onPress={onPress}
    disabled={selectedOption === -1}
  >
    <Text style={styles.submitButtonText}>Submit Vote</Text>
  </Pressable>
);

export default SubmitButton;

const styles = StyleSheet.create({
  submitButton: {
    width: "50%",
    borderRadius: 50,
    marginTop: 30,
    marginBottom: 20,
    alignSelf: "center",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: SIZES.regular,
    fontFamily: FONT.medium,
    paddingVertical: 10,
    textAlign: "center",
  },
});
