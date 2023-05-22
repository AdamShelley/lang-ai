import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Recommended from "./Recommended";
import AllStories from "./AllStories";
import { FONT } from "../../../constants/fonts";

const home = () => {
  const handleAccountBtn = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <AllStories
        ListHeaderComponent={
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={styles.title}>Welcome Back</Text>
              <TouchableOpacity
                style={styles.circle}
                onPress={handleAccountBtn}
              >
                <Text style={styles.accountName}>AS</Text>
              </TouchableOpacity>
            </View>
            <Recommended />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#212124",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    // paddingTop: 20,
    fontFamily: FONT.medium,
    fontSize: 30,
    fontWeight: 100,
    fontWeight: "medium",
    color: "#fff",
    // marginLeft: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#363636",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  accountName: {
    color: "#fff",
    fontFamily: FONT.regular,
  },
});
