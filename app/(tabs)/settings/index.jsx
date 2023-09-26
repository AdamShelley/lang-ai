import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  Switch,
  Pressable,
  Platform,
  ScrollView,
} from "react-native";
import { FONT, SIZES } from "../../../constants";
import useSettingsStore from "../../../state/store";
import { darkTheme, lightTheme } from "../../../constants/theme";
import { useRouter } from "expo-router";
import { languages } from "../../../constants/languages";

// Dev
import { clearAll } from "../../../utils/devFunctions";
const HEADER_HEIGHT = Platform.OS === "android" ? 56 : 44;

const SettingsRow = ({ label, value, onValueChange, theme }) => (
  <View style={styles.row(theme)}>
    <Text style={[styles.text(theme)]}>{label}</Text>
    <Switch
      style={styles.switch}
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={"#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={onValueChange}
      value={value}
    />
  </View>
);

const SettingsHeader = ({ title }) => (
  <Text style={styles.headerText}>{title}</Text>
);

const LanguageButton = ({
  langCode,
  displayName,
  isSelected,
  onSelect,
  theme,
}) => (
  <Pressable
    style={[
      styles.languageButtonContainer(isSelected, theme),
      isSelected ? styles.highlighted(theme) : {},
    ]}
    onPress={() => onSelect(langCode)}
  >
    <Text style={styles.languageButton(isSelected, theme)}>{displayName}</Text>
  </Pressable>
);

const settings = () => {
  const {
    haptics,
    setHaptics,
    pinyin,
    setPinyin,
    textSize,
    setTextSize,
    isDarkMode,
    toggleTheme,
    language,
    setLanguage,
  } = useSettingsStore((state) => ({
    haptics: state.haptics,
    setHaptics: state.setHaptics,
    pinyin: state.pinyin,
    setPinyin: state.setPinyin,
    textSize: state.textSize,
    setTextSize: state.setTextSize,
    isDarkMode: state.isDarkMode,
    toggleTheme: state.toggleTheme,
    language: state.language,
    setLanguage: state.setLanguage,
  }));

  const router = useRouter();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const renderTextSizeButton = (size) => (
    <Pressable
      style={[
        styles.pressable(textSize === size, theme),
        textSize === size ? styles.highlighted : {},
        {
          color: textSize === size && theme.text,
        },
      ]}
      onPress={() => setTextSize(size)}
    >
      <Text style={styles.buttonText(textSize === size, theme, size)}>
        {size.toUpperCase().charAt(0)}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container(theme)}>
      <StatusBar style={isDarkMode ? "dark" : "light"} />

      <ScrollView
        style={styles.wrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <SettingsHeader title="Preferences" />

        <SettingsRow
          label="Haptics"
          value={haptics}
          onValueChange={setHaptics}
          theme={theme}
        />
        <SettingsRow
          label="Show Pinyin"
          value={pinyin}
          onValueChange={setPinyin}
          theme={theme}
        />
        <SettingsRow
          label="Dark Mode"
          value={isDarkMode}
          onValueChange={toggleTheme}
          theme={theme}
        />

        <SettingsHeader title="Display" />
        <View style={styles.row(theme)}>
          <Text style={styles.text(theme)}>Text Size</Text>
          <View style={styles.pressableOptions}>
            {renderTextSizeButton("small")}
            {renderTextSizeButton("medium")}
            {renderTextSizeButton("large")}
          </View>
        </View>

        <SettingsHeader title="Languages" />

        <View style={styles.languageContainer}>
          {languages.map((lang) => (
            <LanguageButton
              key={lang.langCode}
              langCode={lang.langCode}
              displayName={lang.displayName}
              isSelected={language === lang.langCode}
              onSelect={setLanguage}
              theme={theme}
            />
          ))}
        </View>

        <SettingsHeader title="About & Dev" />
        <View style={styles.row(theme)}>
          <Pressable onPress={() => router.push("/about")}>
            <Text style={styles.text(theme)}>About</Text>
          </Pressable>
        </View>

        <View style={styles.row(theme)}>
          <Pressable onPress={clearAll}>
            <Text style={styles.text(theme)}>Clear Cache</Text>
          </Pressable>
        </View>
      </ScrollView>
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
    paddingTop: Platform.OS === "android" ? HEADER_HEIGHT : 0,
  }),
  wrapper: {
    flex: 1,
    // marginTop: 50,
    width: "100%",
    paddingHorizontal: 40,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#aaa",
    marginBottom: 10,
    marginTop: 20,
  },
  text: (theme) => ({
    color: theme.text,
    fontFamily: FONT.bold,
    textAlign: "center",
  }),
  buttonText: (textSize, theme, size) => ({
    color: textSize ? theme.background : theme.text,
    fontFamily: FONT.medium,
    fontSize: SIZES[size],
    textAlign: "center",
  }),
  smallHeading: (theme) => ({
    color: theme.text,
    fontFamily: FONT.bold,
    fontSize: 12,
    marginTop: 20,
    marginBottom: 10,
  }),

  pressableOptions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pressable: (textSize, theme) => ({
    width: 50,
    height: 50,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    // marginHorizontal: 10,
    borderRadius: 10,
    padding: 2,
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
  languageButtonContainer: (isSelected, theme) => ({
    backgroundColor: isSelected ? "#D1E8E2" : "#F4F4F4",
    borderRadius: 10,
    padding: 10,
    margin: 5,
  }),
  highlighted: (theme) => ({
    borderWidth: 2,
    borderColor: theme.text,
    padding: 8,
  }),
  languageButtonContainer: (isSelected, theme) => ({
    backgroundColor: isSelected ? theme.text : theme.settingRow,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    height: 50,
    maxHeight: 50,
    justifyContent: "center",
    paddingHorizontal: 20,
  }),
  languageButton: (isSelected, theme) => ({
    color: isSelected ? theme.background : theme.text,
    fontFamily: FONT.bold,
  }),
});
