import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { Stack } from "expo-router";
import { FONT, SIZES } from "../../constants";

const About = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "About",
          headerStyle: {
            backgroundColor: "#212124",
          },
          headerTintColor: "#eee",
          headerTitleStyle: {
            fontSize: SIZES.large,
            fontFamily: FONT.medium,
            color: "#eee",
          },
        }}
      />
      <StatusBar style="light" />
      <View style={styles.wrapper}>
        <Text style={styles.smallHeading}>About</Text>
      </View>
    </SafeAreaView>
  );
};

export default About;

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
  },
  smallHeading: {
    color: "#fff",
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
    marginTop: 20,
    marginBottom: 10,
  },
});
