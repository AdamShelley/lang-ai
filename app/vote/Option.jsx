import { useEffect } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import Animated, {
  Layout,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  withDelay,
} from "react-native-reanimated";
import { FONT } from "../../constants/fonts";
import useVoteOptionsStore from "../../state/voteOptionsStore";

export const Option = ({
  option,
  index,
  selectedOption,
  handleOptionChoice,
  disabled,
}) => {
  const { submitted } = useVoteOptionsStore();

  const opacity = useSharedValue(submitted && index !== selectedOption ? 0 : 1);

  const animOptions = {
    duration: 500,
  };

  const translateY = useSharedValue(0);

  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const opacityStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: selectedOption === index ? "#e6e6e6" : "transparent",
      backgroundColor: selectedOption === index ? "#323232" : "#e6e6e6",
      borderRadius: 40,
      borderWidth: selectedOption === index ? 3 : 0,
    };
  });

  const textAnimation = useAnimatedStyle(() => {
    return {
      color: selectedOption === index ? "#e6e6e6" : "#323232",
      fontSize: 25,
      alignContent: "center",
      justifyContent: "center",
      margin: 0,
    };
  });

  useEffect(() => {
    if (submitted) {
      if (index === selectedOption) {
        // This is the selected option, animate it to the middle
        let targetValue = 0;
        switch (index) {
          case 0:
            targetValue = 20;
            break;
          case 1:
            break;
          case 2:
            targetValue = -40;
            break;
          default:
            break;
        }

        translateY.value = withDelay(
          500,
          withTiming(targetValue, {
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
          })
        );
      } else {
        // This is not the selected option, fade it out
        opacity.value = withTiming(0, {
          ...animOptions,
          easing: Easing.linear,
        });
      }
    }
  }, [submitted]);

  return (
    <Animated.View
      entering={!submitted && SlideInDown.delay(200 * index).duration(700)}
      layout={Layout.springify()}
      style={[opacityStyles, translateStyle, styles.option]}
      key={index}
    >
      <Pressable
        onPress={() => handleOptionChoice(option, index)}
        disabled={disabled}
      >
        <Animated.View style={[animatedStyle, styles.choiceButton]}>
          <Animated.Text style={textAnimation}>{index + 1}</Animated.Text>
        </Animated.View>
      </Pressable>
      <Text style={styles.optionText}>{option}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  option: {
    color: "#e6e6e6",
    height: 50,
    width: "90%",
    paddingVertical: 5,
    paddingHorizontal: 2,
    marginHorizontal: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 2,
    marginBottom: 0,
    fontWeight: 400,
    borderRadius: 40,
    flex: 1,
  },
  optionText: {
    color: "#e6e6e6",
    textAlign: "left",
    fontSize: 16,
    fontFamily: FONT.medium,
    marginLeft: 20,
    flexShrink: 1,
  },
  choiceButton: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
});
