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
import useDictionary from "../../../hooks/useDictionary";
import { darkTheme, lightTheme } from "../../../constants/theme";
import { useRouter } from "expo-router";

// Dev
import { clearAll } from "../../../utils/devFunctions";

const settings = () => {
  const haptics = useSettingsStore((state) => state.haptics);
  const setHaptics = useSettingsStore((state) => state.setHaptics);
  const pinyin = useSettingsStore((state) => state.pinyin);
  const setPinyin = useSettingsStore((state) => state.setPinyin);
  const textSize = useSettingsStore((state) => state.textSize);
  const setTextSize = useSettingsStore((state) => state.setTextSize);
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const toggleTheme = useSettingsStore((state) => state.toggleTheme);
  const router = useRouter();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const { fetchDictionary } = useDictionary();

  return (
    <SafeAreaView style={styles.container(theme)}>
      <StatusBar style={isDarkMode ? "dark" : "light"} />
      <View style={styles.wrapper}>
        <View style={styles.row(theme)}>
          <Text style={styles.text(theme)}>Haptics</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setHaptics}
            value={haptics}
          />
        </View>
        <View style={styles.row(theme)}>
          <Text style={styles.text(theme)}>Show Pinyin</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setPinyin}
            value={pinyin}
          />
        </View>
        <View style={styles.row(theme)}>
          <Text style={styles.text(theme)}>Dark Mode</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>
        <View style={styles.row(theme)}>
          <Text style={styles.text(theme)}>Text Size</Text>
          <View style={styles.pressableOptions}>
            <Pressable
              style={styles.pressable(textSize === "small", theme)}
              onPress={() => setTextSize("small")}
            >
              <Text style={styles.buttonText(textSize === "small", theme)}>
                S
              </Text>
            </Pressable>
            <Pressable
              style={styles.pressable(textSize === "medium", theme)}
              onPress={() => setTextSize("medium")}
            >
              <Text style={styles.buttonText(textSize === "medium", theme)}>
                M
              </Text>
            </Pressable>
            <Pressable
              style={styles.pressable(textSize === "large", theme)}
              onPress={() => setTextSize("large")}
            >
              <Text style={styles.buttonText(textSize === "large", theme)}>
                L
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.row(theme)}>
          <Pressable onPress={() => fetchDictionary(true)}>
            <Text style={styles.text(theme)}>Update Dictionary</Text>
          </Pressable>
        </View>
        <View style={styles.row(theme)}>
          <Pressable onPress={() => router.push("/about")}>
            <Text style={styles.text(theme)}>About</Text>
          </Pressable>
        </View>

        {/* DEV ONLY */}

        <Text style={styles.smallHeading(theme)}>----Dev Only----</Text>
        <View style={styles.row(theme)}>
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
  container: (theme) => ({
    backgroundColor: theme.headerBackground,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  }),
  wrapper: {
    flex: 1,
    marginTop: 100,
    width: "80%",
  },
  text: (theme) => ({
    color: theme.text,
    fontFamily: FONT.medium,
    textAlign: "center",
  }),
  buttonText: (textSize, theme) => ({
    color: textSize ? theme.background : theme.text,
    fontFamily: FONT.medium,
    textAlign: "center",
  }),
  smallHeading: (theme) => ({
    color: theme.text,
    fontFamily: FONT.bold,
    fontSize: 12,
    marginTop: 20,
    marginBottom: 10,
  }),

  switch: {},
  pressableOptions: {
    flexDirection: "row",
    // marginHorizontal: 20,
  },
  pressable: (textSize, theme) => ({
    width: 30,
    textAlign: "center",
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 5,
    backgroundColor: textSize ? theme.text : "transparent",
  }),
  row: (theme) => ({
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
    backgroundColor: theme.settingRow,
    width: "100%",
    marginTop: 10,
  }),
});
