import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FONT } from "../../../constants/fonts";
import Recommended from "./Recommended";
import AllStories from "./AllStories";

import useStories from "../../../hooks/useStories";
import useDictionary from "../../../hooks/useDictionary";
import useStoriesStore from "../../../state/storiesStore";

const home = () => {
  const router = useRouter();

  // Initialize data
  useDictionary();
  useStories();

  const stories = useStoriesStore((state) => state.stories);

  const goToUser = () => {
    router.push("/user");
  };

  //--------------------------------------------//
  // Just for dev purposes
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    alert("Storage cleared");
    console.log("Done.");
  };
  //--------------------------------------------//

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {stories && (
        <AllStories
          stories={stories}
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
              <View style={{ flex: 11 }}>
                <TouchableOpacity onPress={clearAll}>
                  <Text style={{ color: "red", padding: 5 }}>
                    Clear Storage
                  </Text>
                </TouchableOpacity>
                <Recommended stories={stories} />
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
