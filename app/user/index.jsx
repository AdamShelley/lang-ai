import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import React from "react";
import { FONT } from "../../constants/fonts";
import { Stack } from "expo-router";

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
            fontSize: 20,
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
          <Text style={styles.text}>0.1</Text>
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
