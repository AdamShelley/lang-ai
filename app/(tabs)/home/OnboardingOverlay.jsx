import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FONT, SIZES } from "../../../constants";

const OnboardingOverlay = ({ onClose }) => {
  return (
    <View style={styles.overlay}>
      <View style={{ marginBottom: 20 }}>
        <Image
          source={require("./icon.png")}
          style={styles.image}
          resizeMode="cover"
          alt="logo"
        />
      </View>

      <Text style={styles.guideText}>
        Welcome to <Text style={styles.langAIText}>LangAI</Text>
      </Text>

      <Text style={styles.feedbackText}>
        Explore AI-generated stories tailored for different proficiency levels.
      </Text>

      <Text style={styles.feedbackText}>
        Thank you for testing my WIP app. I hope you find it useful. I
        appreciate any feedback you may have to improve LangAI!
      </Text>

      <Text style={styles.infoText}>
        Internet access is required to fetch the latest stories for you.
      </Text>

      <Text style={styles.tipText}>
        Tip: Click on a story to begin reading.
      </Text>

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
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  guideText: {
    color: "#FFF",
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  langAIText: {
    color: "green",
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
  },

  feedbackText: {
    color: "#FFF",
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    marginHorizontal: 20,
    margin: 10,
    textAlign: "center",
  },

  infoText: {
    color: "#FFF",
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    marginHorizontal: 20,
    marginTop: 20,
    fontStyle: "italic",
  },

  tipText: {
    color: "#FFF",
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    marginHorizontal: 20,
    marginTop: 40,
  },
  closeButton: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "darkgreen",
    borderRadius: 5,
    width: "50%",
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  image: {
    height: 100,
    width: 100,
  },
});
