import { useCallback, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { FONT } from "../../../constants/fonts";
import { darkTheme, lightTheme } from "../../../constants/theme";
import Recommended from "./Recommended";
import AllStories from "./AllStories";
import useStories from "../../../hooks/useStories";
import useDictionary from "../../../hooks/useDictionary";
import useStoriesStore from "../../../state/storiesStore";
import useSettingsStore from "../../../state/store";
import OnboardingOverlay from "./OnboardingOverlay";

const HEADER_HEIGHT = Platform.OS === "android" ? 50 : 44;

const home = () => {
  const router = useRouter();
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const hasSeenOverlay = useSettingsStore((state) => state.hasSeenOverlay);
  const setHasSeenOverlay = useSettingsStore(
    (state) => state.setHasSeenOverlay
  );
  const theme = isDarkMode ? darkTheme : lightTheme;
  const stories = useStoriesStore((state) => state.stories);
  const [refreshing, setRefreshing] = useState(false);
  // Filter out read stories
  const unreadStories = (stories || []).filter((story) => !story.read);
  const [showOverlay, setShowOverlay] = useState(!hasSeenOverlay); // CHANGE TO GLOBAL LATER

  // Initialize data
  const { fetchStories } = useStories();
  const { fetchDictionary } = useDictionary();

  // If Refresh pulldown is triggered
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([fetchDictionary(true), fetchStories(true)]);
    setRefreshing(false);
  }, []);

  const goToUser = useCallback(() => {
    router.push("/user");
  }, []);

  const handleOverlay = () => {
    setShowOverlay(false);
    setHasSeenOverlay(true);
  };

  return (
    <SafeAreaView style={styles.container(theme)}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <AllStories
        stories={unreadStories}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.text}
            title={"Pull to refresh"}
            titleColor={theme.text}
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
              <Text style={styles.title(theme)}>Home</Text>
              <TouchableOpacity style={styles.circle} onPress={goToUser}>
                <Feather name="user" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 11 }}>
              <Recommended stories={unreadStories.slice(0, 5)} />
            </View>
          </>
        }
      />

      {showOverlay && <OnboardingOverlay onClose={handleOverlay} />}
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  container: (theme) => ({
    flex: 1,
    backgroundColor: theme.headerBackground,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? HEADER_HEIGHT : 0,
  }),
  title: (theme) => ({
    paddingTop: 40,
    fontFamily: FONT.medium,
    fontSize: 30,
    fontWeight: 100,
    fontWeight: "medium",
    color: theme.text,
    paddingHorizontal: 20,
  }),
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
  text: (theme) => ({
    color: theme.text,
  }),
});
