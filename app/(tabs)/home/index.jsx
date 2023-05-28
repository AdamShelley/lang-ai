import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import Recommended from "./Recommended";
import AllStories from "./AllStories";
import { FONT } from "../../../constants/fonts";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import useStoriesStore from "../../../state/storiesStore";

const home = () => {
  const router = useRouter();
  const goToUser = () => {
    router.push("/user");
  };

  const stories = useStoriesStore((state) => state.stories);
  const setStories = useStoriesStore((state) => state.setStories);

  useEffect(() => {
    try {
      const fetchStories = async () => {
        try {
          const response = await fetch("http://192.168.1.160:3000/api/db");
          const data = await response.json();

          // data.forEach((story) => {
          //   story.image =
          //     "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2952&q=80";
          // });

          setStories(data);
        } catch (error) {
          alert(error);
          throw console.log(error);
        }
      };
      fetchStories();
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {stories && (
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
      )}
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
