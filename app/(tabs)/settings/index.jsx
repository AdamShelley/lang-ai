import { View, StyleSheet, SafeAreaView, StatusBar, Text } from "react-native";
import { FONT } from "../../../constants/fonts";
import useSettingsStore from "../../../state/store";

const settings = () => {
  const state = useSettingsStore();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.text}>Haptics</Text>
          <Text style={styles.text}>Haptics</Text>
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
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "#fff",
    fontFamily: FONT.regular,
  },
});
