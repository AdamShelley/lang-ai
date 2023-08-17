import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FONT, SIZES } from "../../constants";
import { useState } from "react";

const OnboardingOverlay = ({ onClose }) => {
  const [step, setStep] = useState(0);

  const stepsContent = [
    "If you are unsure of a word, press it to see the definition appear at the top.",
    "Tap the buttons at the bottom of the screen to show the translation, show pinyin, and mark it as 'read' once you've finished reading.",
    "On some stories, you will be able to vote on the direction of the next part of the story. Keep watch and vote for your favourite choice!",
    "Enjoy the story!",
  ];

  const handleStepForward = () => {
    if (step >= stepsContent.length - 1) {
      onClose();
    } else {
      setStep(step + 1);
    }
  };

  const handleStepBack = () => {
    setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : 0));
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.onboardingContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.guideText}>This is the story page</Text>

          <Text style={styles.normalText}>{stepsContent[step]}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {step > 0 && (
            <TouchableOpacity
              onPress={handleStepBack}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Previous</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleStepForward}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>
              {step === stepsContent.length - 1 ? "Finish" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
  onboardingContainer: {
    height: "50%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,.4)",
  },
  contentContainer: {
    flex: 1,
  },
  guideText: {
    color: "#FFF",
    fontSize: SIZES.xLarge,
    marginBottom: 20,
    fontFamily: FONT.medium,
    textAlign: "center",
  },
  normalText: {
    marginTop: 20,
    color: "#FFF",
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    lineHeight: 30,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    width: "100%",
  },
  closeButton: {
    padding: 20,
    backgroundColor: "#424242",
    borderRadius: 5,
    marginHorizontal: 10,
    width: "50%",
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});
