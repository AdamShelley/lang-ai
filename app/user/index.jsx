import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import React from "react";
import { FONT, SIZES } from "../../constants";
import { Stack } from "expo-router";
import { version } from "../../package.json";

const user = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "Account",
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
        <Text style={styles.smallHeading}>Account</Text>
        <View style={styles.row}>
          <Text style={styles.text}>OS:</Text>
          <Text style={styles.text}>{Platform.OS}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>App Version:</Text>
          <Text style={styles.text}>{version}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Email:</Text>
          <Text style={styles.text}>test@test.com</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default user;

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
    letterSpacing: 1,
  },
  smallHeading: {
    color: "#fff",
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
    marginTop: 20,
    marginBottom: 10,
  },

  switch: {},
  row: {
    height: 50,
    maxHeight: 50,
    flexDirection: "row",
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
