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
            fontSize: SIZES.medium,
            fontFamily: FONT.medium,
            color: "#eee",
          },
        }}
      />
      <StatusBar style="light" />

      <View style={styles.content}>
        <Text style={styles.label}>OS:</Text>
        <Text style={styles.value}>{Platform.OS}</Text>

        <Text style={styles.label}>App Version:</Text>
        <Text style={styles.value}>{version}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>test@test.com</Text>
      </View>
    </SafeAreaView>
  );
};

export default user;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#212121",
    flex: 1,
    paddingHorzontal: 20,
  },

  content: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },

  label: {
    color: "#aaa",
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    marginVertical: 10,
  },
  value: {
    color: "#fff",
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    marginBottom: 20,
  },
});
