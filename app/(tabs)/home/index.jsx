import { useCallback, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { FONT } from "../../../constants/fonts";
import Recommended from "./Recommended";
import AllStories from "./AllStories";
import useStories from "../../../hooks/useStories";
import useDictionary from "../../../hooks/useDictionary";
import useStoriesStore from "../../../state/storiesStore";

const home = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const stories = useStoriesStore((state) => state.stories);
  // Filter out read stories
  const unreadStories = stories.filter((story) => !story.read);

  // Initialize data
  useDictionary();
  const { fetchStories } = useStories();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Fetch new data
    fetchStories().then(() => setRefreshing(false));
  }, []);

  const goToUser = () => {
    router.push("/user");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {stories && (
        <AllStories
          stories={unreadStories}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={"#fff"}
              title={"Pull to refresh"}
              titleColor={"#fff"}
            />
          }
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
                <Recommended stories={unreadStories.slice(0, 5)} />
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
