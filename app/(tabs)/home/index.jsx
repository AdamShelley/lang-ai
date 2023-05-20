import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Recommended from "./Recommended";

const home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={styles.title}>Welcome Back</Text>
          <Recommended />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212124",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    paddingTop: 20,
    fontSize: 30,
    fontWeight: "medium",
    color: "#fff",
  },
});
