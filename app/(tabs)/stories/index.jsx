import { useState, useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
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

const stories = () => {
  // State
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  // Screen Width
  const screenWidth = Dimensions.get("window").width;
  // Card width (45%)
  const cardWidth = screenWidth * 0.45;
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
        const isEvenIndex = index % 2 === 0;
        dim.width = screenWidth / numOfColumns;
        dim.height = cardWidth * 2 - 30;

        dim.x = isEvenIndex ? 0 : dim.width;
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
        {filteredStories && filteredStories.length > 0 ? (
          <RecyclerListView
            layoutProvider={layoutProvider}
            dataProvider={dataProvider}
            rowRenderer={(type, data) => (
              <StoryCard story={data} width={cardWidth} key={data.gptId} />
            )}
            contentContainerStyle={{
              marginTop: 5,
              paddingBottom: 100,
            }}
            renderAheadOffset={500}
            renderFooter={() => <View style={{ paddingVertical: 0 }} />}
          />
        ) : (
          <Text style={{ color: "white" }}>No items to display</Text>
        )}
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
  }),
});
