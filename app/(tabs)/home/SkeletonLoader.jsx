import { StyleSheet, View } from "react-native";
import Animated, {
  Clock,
  block,
  useCode,
  timing,
  cond,
  eq,
  startClock,
  Value,
  set,
  clockRunning,
  EasingNode,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../../constants/theme";
import { FONT } from "../../../constants";

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

const SkeletonLoader = ({ width = 200, wide = false, theme }) => {
  const animatedValue = new Animated.Value(0);

  const adjustedWidth = width === 200 ? 200 : 200 * 0.9;

  const clock = new Clock();

  const runTiming = (clock) => {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      frameTime: new Value(0),
      time: new Value(0),
    };

    const config = {
      toValue: new Value(1),
      duration: 1500,
      easing: EasingNode.inOut(EasingNode.ease),
    };

    return block([
      timing(clock, state, config),
      cond(eq(state.finished, 1), [
        set(state.finished, 0),
        set(state.frameTime, 0),
        set(state.time, 0),
        set(state.position, 0),
      ]),
      state.position,
    ]);
  };

  useCode(() => {
    return block([
      startClock(clock),
      cond(eq(clockRunning(clock), 0), startClock(clock)),
      set(animatedValue, runTiming(clock)),
    ]);
  }, [clock, animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-adjustedWidth, adjustedWidth],
  });

  return (
    <View style={styles.container(width, wide, theme)}>
      <View style={styles.imageContainer(wide)}>
        <AnimatedLG
          colors={["#f0f0f0", "#e0e0e0", "#e0e0e0", "#f0f0f0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateX: translateX }],
          }}
        />
      </View>
      <View style={styles.bottomSection(wide)}>
        {!wide && <View style={styles.nonWideLevel(wide, theme)} />}
        {wide && <Animated.View style={[styles.smallText]} />}
      </View>
    </View>
  );
};

export default SkeletonLoader;

const styles = StyleSheet.create({
  container: (width, wide, theme) => ({
    backgroundColor: theme.cardColor,
    flexDirection: wide ? "row" : "column",
    alignItems: wide ? "flex-start" : "center",
    justifyContent: wide ? "flex-start" : "flex-start",
    alignSelf: "center",
    width: width ? width : 200,
    height: wide ? 100 : 250,
    borderRadius: 10,
    marginTop: 15,
    overflow: "hidden",
  }),
  imageContainer: (wide) => ({
    width: wide ? "30%" : "100%",
    height: wide ? "100%" : "60%",
    borderTopRightRadius: wide ? 0 : 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: wide ? 10 : 0,
    borderBottomRightRadius: 0,
    overflow: "hidden",
    position: "relative",
    tintColor: wide ? "rgba(255, 255, 255, 0.6)" : "none",
  }),
  image: (wide) => ({
    height: "100%",
    borderTopRightRadius: wide ? 0 : 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: wide ? 10 : 0,
    backgroundColor: "#e0e0e0",
    alignContent: "center",
    justifyContent: "center",
  }),
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },

  text: (wide) => ({
    height: 20,
    width: wide ? "50%" : "80%",
    backgroundColor: "#e0e0e0",
    marginVertical: 5,
  }),
  smallText: {
    height: 40,
    width: "80%",
    backgroundColor: "#424242",
    marginVertical: 5,
  },
  bottomSection: (wide) => ({
    height: wide ? "100%" : "30%",
    padding: 10,
    flexDirection: "column",
    alignItems: wide ? "flex-start" : "flex-start",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    overflow: "hidden",
    marginLeft: wide ? 10 : null,
    width: wide ? "65%" : null,
    flex: 1,
  }),
  nonWideLevel: (wide, theme) => ({
    borderRadius: 10,
    borderWidth: theme === lightTheme ? 0 : 1,
    borderColor: wide ? "#313131" : "transparent",
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: theme.background,
    color: theme.text,
    alignSelf: wide ? "auto" : "center",
    position: wide ? "absolute" : "relative",
    left: wide ? 10 : null,
    right: wide ? 10 : null,
    bottom: wide ? 1 : null,
    textAlign: "center",
    fontFamily: FONT.medium,
    textTransform: "uppercase",
  }),
  wideLevel: {
    padding: 5,
    backgroundColor: "#212121",
    borderRadius: 10,
    borderWidth: 0,
    borderColor: "#313131",
    position: "absolute",
    bottom: 2,
    left: "10%",
    right: "10%",
    textAlign: "center",
    alignSelf: "center",
    shadowColor: "rgba(0,0,0,0.9)",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },
});
