import { useEffect } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import Animated, {
  FadeOut,
  Layout,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FONT } from "../../constants/fonts";
import useVoteOptionsStore from "../../state/voteOptionsStore";

export const Option = ({ option, index, handleOptionChoice }) => {
  const { selectedOption, submitted } = useVoteOptionsStore();

  const opacity = useSharedValue(1);
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
      opacity: withTiming(opacity.value, animOptions),
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderColor:
        selectedOption === index
          ? withTiming("#e6e6e6", animOptions)
          : withTiming("transparent", animOptions),
      backgroundColor:
        selectedOption === index
          ? withTiming("#323232", animOptions)
          : withTiming("#e6e6e6", animOptions),
      borderRadius: 40,
      borderWidth:
        selectedOption === index
          ? withTiming(3, animOptions)
          : withTiming(0, animOptions),
    };
  });

  const textAnimation = useAnimatedStyle(() => {
    return {
      color:
        selectedOption === index
          ? withTiming("#e6e6e6", animOptions)
          : withTiming("#323232", animOptions),
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
        switch (index) {
          case 0:
            translateY.value = translateY.value = withTiming(120, {
              ...animOptions,
              delay: 500,
            });
            break;
          case 1:
            break;
          case 2:
            translateY.value = withTiming(-110, {
              ...animOptions,
              delay: 500,
            });
            break;
          default:
            break;
        }
      } else {
        // This is not the selected option, fade it out
        opacity.value = 0;
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
      <Pressable onPress={() => handleOptionChoice(option, index)}>
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
