import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  Switch,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { FONT } from "../../../constants/fonts";
import useSettingsStore from "../../../state/store";

// Dev
import { clearAll } from "../../../utils/devFunctions";

const settings = () => {
  const haptics = useSettingsStore((state) => state.haptics);
  const setHaptics = useSettingsStore((state) => state.setHaptics);
  const pinyin = useSettingsStore((state) => state.pinyin);
  const setPinyin = useSettingsStore((state) => state.setPinyin);
  const textSize = useSettingsStore((state) => state.textSize);
  const setTextSize = useSettingsStore((state) => state.setTextSize);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <Text style={styles.text}>Haptics</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setHaptics}
            value={haptics}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Show Pinyin</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setPinyin}
            value={pinyin}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Dark/Light Mode</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {}}
            value={false}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Text Size</Text>
          <View style={styles.pressableOptions}>
            <Pressable
              style={styles.pressable(textSize === "small")}
              onPress={() => setTextSize("small")}
            >
              <Text style={styles.buttonText(textSize === "small")}>S</Text>
            </Pressable>
            <Pressable
              style={styles.pressable(textSize === "medium")}
              onPress={() => setTextSize("medium")}
            >
              <Text style={styles.buttonText(textSize === "medium")}>M</Text>
            </Pressable>
            <Pressable
              style={styles.pressable(textSize === "large")}
              onPress={() => setTextSize("large")}
            >
              <Text style={styles.buttonText(textSize === "large")}>L</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>About</Text>
        </View>

        {/* DEV ONLY */}

        <Text style={styles.smallHeading}>----Dev Only----</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={clearAll}>
            <Text style={{ color: "red", padding: 5 }}>Clear Storage</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default settings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#212121",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  wrapper: {
    flex: 1,
    marginTop: 100,
    width: "80%",
  },
  text: {
    color: "#fff",
    fontFamily: FONT.medium,
    textAlign: "center",
  },
  buttonText: (textSize) => ({
    color: textSize ? "#000" : "#fff",
    fontFamily: FONT.medium,
    textAlign: "center",
  }),
  smallHeading: {
    color: "#fff",
    fontFamily: FONT.bold,
    fontSize: 12,
    marginTop: 20,
    marginBottom: 10,
  },

  switch: {},
  pressableOptions: {
    flexDirection: "row",
    // marginHorizontal: 20,
  },
  pressable: (textSize) => ({
    width: 30,
    textAlign: "center",
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 5,
    backgroundColor: textSize ? "#fff" : "transparent",
  }),
  row: {
    height: 50,
    maxHeight: 50,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#323232",
    width: "100%",
    marginTop: 10,
  },
});
