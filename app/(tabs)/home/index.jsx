import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Recommended from "./Recommended";
import AllStories from "./AllStories";
import { FONT } from "../../../constants/fonts";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

const home = () => {
  const router = useRouter();
  const goToUser = () => {
    router.push("/user");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <AllStories
        ListHeaderComponent={
          <>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text style={styles.title}>Home</Text>
              <TouchableOpacity style={styles.circle} onPress={goToUser}>
                <Text style={styles.text}>AS</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <Recommended />
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    paddingTop: 40,
    fontFamily: FONT.medium,
    fontSize: 30,
    fontWeight: 100,
    fontWeight: "medium",
    color: "#fff",
    paddingHorizontal: 20,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#474750",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    marginTop: 30,
  },
  text: {
    color: "#e6e6e6",
  },
});
