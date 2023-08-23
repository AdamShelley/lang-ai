import { useState, useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
  Platform,
} from "react-native";
import {
  RecyclerListView,
  LayoutProvider,
  DataProvider,
} from "recyclerlistview";
import StoryCard from "./StoryCard";
import useStoriesStore from "../../../state/storiesStore";
import FilterSection from "./FilterSection";
import useSettingsStore from "../../../state/store";
import { darkTheme, lightTheme } from "../../../constants/theme";
import SkeletonLoader from "./SkeletonLoader";

const HEADER_HEIGHT = Platform.OS === "android" ? 80 : 44;
const RENDER_OFFSET = Platform.OS === "android" ? 600 : 500;

const stories = () => {
  // State
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  // Screen Width
  const screenWidth = Dimensions.get("window").width;
  // Card width (45%)
  const cardPercentage = 0.49;
  const cardWidth = screenWidth * cardPercentage;
  const isLoaded = useStoriesStore((state) => state.isLoaded);
  const allStories = useStoriesStore((state) => state.stories);
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  // DataProvider for RecyclerListView
  const [dataProvider, setDataProvider] = useState(
    new DataProvider(
      (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)
    ).cloneWithRows([])
  );

  // Filter stories based on selectedGenre and selectedLevel
  const filteredStories = useMemo(() => {
    let result = allStories;

    if (selectedGenre !== "All") {
      result = result.filter(
        (story) => story.topic?.toLowerCase() === selectedGenre.toLowerCase()
      );
    }

    if (selectedLevel !== "All") {
      result = result.filter(
        (story) => story.level?.toLowerCase() === selectedLevel.toLowerCase()
      );
    }

    return result;
  }, [selectedGenre, selectedLevel, allStories]);

  // LayoutProvider for RecyclerListView
  const numOfColumns = 2;

  const layoutProvider = new LayoutProvider(
    () => {
      return 0;
    },
    (type, dim, index) => {
      if (filteredStories && filteredStories.length > 0) {
        // const isEvenIndex = index % 2 === 0;

        dim.width = screenWidth / numOfColumns;
        dim.height = Platform.OS === "ios" ? cardWidth * 1.6 : cardWidth * 1.6;
      } else {
        dim.width = 0;
        dim.height = 0;
      }
    }
  );

  // Update dataProvider when filteredStories changes
  useEffect(() => {
    setDataProvider(
      new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(filteredStories)
    );
  }, [filteredStories]);

  // Skeleton for background loading
  const skeletonDataProvider = new DataProvider(
    (r1, r2) => r1 !== r2
  ).cloneWithRows(new Array(6).fill(null));

  const skeletonLayoutProvider = new LayoutProvider(
    () => {
      return 0;
    },
    (type, dim, index) => {
      dim.width = screenWidth / numOfColumns;
      dim.height = Platform.OS === "ios" ? cardWidth * 1.2 : cardWidth * 1.2;
    }
  );

  return (
    <SafeAreaView style={styles.container(theme)}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <FilterSection
        selectedGenre={selectedGenre}
        selectedLevel={selectedLevel}
        setSelectedGenre={setSelectedGenre}
        setSelectedLevel={setSelectedLevel}
        allStories={allStories}
      />

      <View>
        <RecyclerListView
          layoutProvider={isLoaded ? layoutProvider : skeletonLayoutProvider}
          dataProvider={isLoaded ? dataProvider : skeletonDataProvider}
          rowRenderer={(type, data) =>
            isLoaded ? (
              <StoryCard story={data} width={cardWidth} key={data.gptId} />
            ) : (
              <SkeletonLoader width={cardWidth} />
            )
          }
          contentContainerStyle={{
            marginTop: 5,
            paddingBottom: 100,
          }}
          renderAheadOffset={RENDER_OFFSET}
          renderFooter={() => <View style={{ paddingVertical: 0 }} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default stories;

const styles = StyleSheet.create({
  container: (theme) => ({
    backgroundColor: theme.headerBackground,
    flex: 1,
    width: "100%",
    paddingTop: Platform.OS === "android" ? HEADER_HEIGHT : 0,
  }),
});
