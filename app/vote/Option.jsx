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
import { FONT, SIZES } from "../../constants";

export const Option = ({
  option,
  index,
  selectedOption,
  handleOptionChoice,
  disabled,
  submitted,
  theme,
}) => {
  const opacity = useSharedValue(1);
  const selectedOpacity = useSharedValue(1);
  const translateY = useSharedValue(0);
  const borderAnimation = useSharedValue(selectedOption === index ? 3 : 0);

  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const opacityStyles = useAnimatedStyle(() => {
    return {
      opacity: index === selectedOption ? selectedOpacity.value : opacity.value,
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: selectedOption === index ? theme.text : "transparent",
      backgroundColor:
        selectedOption === index || submitted ? "#323232" : "#e6e6e6",
      borderRadius: 40,
      borderWidth: borderAnimation.value,
    };
  });

  const textAnimation = useAnimatedStyle(() => {
    return {
      color: selectedOption === index || submitted ? "#e6e6e6" : "#323232",
      fontSize: SIZES.xLarge,
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

        borderAnimation.value = withTiming(3, {
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
        });

        borderAnimation.value = 3;
      }
    }
  }, [submitted]);

  return (
    <Animated.View
      entering={!submitted && SlideInDown.delay(200 * index).duration(700)}
      layout={Layout.springify()}
      style={[opacityStyles, translateStyle, styles.option(theme)]}
      key={index}
    >
      <Pressable
        onPress={() => {
          handleOptionChoice(option, index);
          borderAnimation.value = withTiming(3, {
            duration: 300,
            easing: Easing.inOut(Easing.ease),
          });
        }}
        disabled={disabled}
      >
        <Animated.View style={[animatedStyle, styles.choiceButton]}>
          <Animated.Text style={textAnimation}>{index + 1}</Animated.Text>
        </Animated.View>
      </Pressable>
      <Text style={styles.optionText(theme)}>{option}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  option: (theme) => ({
    color: theme.text,
    height: 20,
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
  }),
  optionText: (theme) => ({
    color: theme.text,
    textAlign: "left",
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    marginLeft: 20,
    flexShrink: 1,
  }),
  choiceButton: {
    width: 60,
    height: 60,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
});
