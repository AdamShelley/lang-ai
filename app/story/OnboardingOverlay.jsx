import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { FONT, SIZES } from "../../constants";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const OnboardingOverlay = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState("right");
  const fadeInOpacity = new Animated.Value(0);
  const translateXValue = new Animated.Value(0);
  const buttonContainerJustify = step > 0 ? "space-between" : "center";
  const imageHeight = step === 0 ? "150%" : step === 1 ? "180%" : "140%";
  const closeButtonColor = step < 3 ? "#424242" : "green";

  // ANIMATIONS
  const animateTextFadeIn = () => {
    Animated.parallel([
      Animated.timing(fadeInOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateXValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateFadeOut = (callback) => {
    Animated.parallel([
      Animated.timing(fadeInOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateXValue, {
        toValue: direction === "right" ? -400 : 400,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  // HANDLE STEPS
  const stepsContent = [
    {
      text: "If you are unsure of a word, press it to see the definition appear at the top.",
      image: require("./gifs/step0.gif"),
      align: "flex-start",
    },
    {
      text: "Tap the buttons at the bottom of the screen to show the translation, show pinyin, and mark it as 'read' once you've finished reading.",
      image: require("./gifs/step1.gif"),
      align: "flex-end",
    },
    {
      text: "On some stories, you will be able to vote on the direction of the next part of the story. Keep watch and vote for your favourite choice!",
      image: require("./gifs/step2.gif"),
      align: "flex-end",
    },
    {
      text: "Good luck on your learning journey! 👍",
      image: "🔥",
      align: "center",
    },
  ];

  const handleStepForward = () => {
    setDirection("right");
    if (step >= stepsContent.length - 1) {
      animateFadeOut(onClose);
    } else {
      animateFadeOut(() => setStep(step + 1));
    }
  };

  const handleStepBack = () => {
    setDirection("left");
    animateFadeOut(() =>
      setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : 0))
    );
  };

  useEffect(() => {
    fadeInOpacity.setValue(0);
    translateXValue.setValue(direction === "right" ? 400 : -400);
    animateTextFadeIn();
  }, [step]);

  return (
    <View style={styles.overlay}>
      <View style={styles.onboardingContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.guideText}>
            Tips to get started ({step + 1}/{stepsContent.length})
          </Text>

          <Animated.Text
            style={[
              styles.normalText,
              {
                textAlign: step === 3 ? "center" : "left",
                opacity: fadeInOpacity,
                transform: [{ translateX: translateXValue }],
              },
            ]}
          >
            {stepsContent[step].text}
          </Animated.Text>

          {step < 3 && (
            <Animated.View
              style={[
                styles.stepImageWrapper(stepsContent[step].align),
                {
                  opacity: fadeInOpacity,
                  transform: [{ translateX: translateXValue }],
                },
              ]}
            >
              <Image
                source={stepsContent[step].image}
                style={[
                  styles.stepImage(stepsContent[step].align),
                  {
                    height: imageHeight,
                  },
                ]}
              />
            </Animated.View>
          )}
          {step === 3 && (
            <Text
              style={{ fontSize: 100, textAlign: "center", marginTop: 100 }}
            >
              {stepsContent[step].image}
            </Text>
          )}
        </View>
        <View
          style={[
            styles.buttonContainer,
            { justifyContent: buttonContainerJustify },
          ]}
        >
          {step > 0 && (
            <TouchableOpacity
              onPress={handleStepBack}
              style={styles.closeButton}
            >
              <MaterialCommunityIcons
                name="arrow-left-top-bold"
                size={16}
                color="#fff"
              />

              <Text style={styles.closeButtonText}>Previous</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleStepForward}
            style={[styles.closeButton, { backgroundColor: closeButtonColor }]}
          >
            <Text style={styles.closeButtonText}>
              {step === stepsContent.length - 1 ? "Dive in!" : "Next"}
            </Text>
            <MaterialCommunityIcons
              name="arrow-right-top-bold"
              size={16}
              color="#fff"
            />
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
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    flex: 1,
    width: "100%",
  },
  onboardingContainer: {
    height: "95%",
    zIndex: 10,
    position: "relative",
    width: "100%",
  },
  contentContainer: {
    flex: 1,
  },

  stepImageWrapper: (align) => ({
    width: "80%",
    height: "70%",
    overflow: "hidden",
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "linear-gradient(to bottom, #212121, #313131)",
    borderWidth: 1,
    borderColor: "#424242",
    justifyContent: align ? align : "center",
  }),

  stepImage: (align) => ({
    width: "100%",
    resizeMode: "cover",
    alignSelf: align ? align : "center",
  }),
  guideText: {
    color: "#FFF",
    fontSize: SIZES.xLarge,
    marginBottom: 20,
    fontFamily: FONT.bold,
    textAlign: "center",
  },
  normalText: {
    marginTop: 10,
    color: "#FFF",
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    lineHeight: 25,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,

    width: "100%",
    marginTop: 60,
  },
  closeButton: {
    padding: 20,
    backgroundColor: "#424242",
    borderRadius: 5,

    width: "45%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    marginHorizontal: 10,
  },
});
