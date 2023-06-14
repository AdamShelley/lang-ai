import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  Switch,
  TouchableOpacity,
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
    width: "60%",
  },
  text: {
    color: "#fff",
    fontFamily: FONT.bold,
  },
  smallHeading: {
    color: "#fff",
    fontFamily: FONT.bold,
    fontSize: 12,
    marginTop: 20,
    marginBottom: 10,
  },

  switch: {},
  row: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#424242",
    width: "100%",
    marginTop: 10,
  },
});
