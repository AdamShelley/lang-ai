import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FONT, SIZES } from "../../../constants";

const OnboardingOverlay = ({ onClose }) => {
  return (
    <View style={styles.overlay}>
      <Text style={styles.guideText}>
        Welcome to{" "}
        <Text
          style={{
            color: "green",
            fontFamily: FONT.bold,
            fontSize: SIZES.xLarge,
          }}
        >
          {" "}
          LangAI{" "}
        </Text>{" "}
      </Text>
      <Text style={styles.normalText}>
        Thank you for testing my WIP app. I hope you find it useful.
      </Text>

      <Text style={styles.normalText}>Click on a story to begin reading.</Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Get Started!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingOverlay;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)", // semi-transparent
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  guideText: {
    color: "#FFF",
    fontSize: SIZES.large,
    marginBottom: 20,
    fontFamily: FONT.medium,
  },
  normalText: {
    color: "#FFF",
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    padding: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#212121",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
  },
});
