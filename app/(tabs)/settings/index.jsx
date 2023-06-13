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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <Text style={styles.text}>Haptics</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setHaptics}
            value={haptics}
          />
        </View>
        <Text style={styles.text}>Dev Only</Text>
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
  },
  text: {
    color: "#fff",
    fontFamily: FONT.regular,
  },
  row: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: 20,
    padding: 20,
    backgroundColor: "#424242",
  },
});
