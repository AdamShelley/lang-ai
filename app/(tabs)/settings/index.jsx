import { View, StyleSheet, SafeAreaView, StatusBar, Text } from "react-native";
import { FONT } from "../../../constants/fonts";

const settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View>
        <Text style={styles.text}>Index</Text>
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
  text: {
    color: "#fff",
    fontFamily: FONT.regular,
  },
});
