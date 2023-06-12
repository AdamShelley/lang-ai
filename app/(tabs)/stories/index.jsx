import { useState, useMemo } from "react";

import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import StoryCard from "./StoryCard";

import useStoriesStore from "../../../state/storiesStore";
import FilterSection from "./FilterSection";
import {
  RecyclerListView,
  LayoutProvider,
  DataProvider,
} from "recyclerlistview";

const stories = () => {
  // State
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Screen Width
  const screenWidth = Dimensions.get("window").width;
  // Card width (40%)
  const cardWidth = screenWidth * 0.45;

  const allStories = useStoriesStore((state) => state.stories);

  const filteredStories = useMemo(() => {
    if (selectedGenre === "All") {
      return allStories;
    } else {
      return allStories.filter(
        (story) => story.topic.toLowerCase() === selectedGenre.toLowerCase()
      );
    }
  }, [selectedGenre, allStories]);

  const dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
  });

  const numOfColumns = 2;
  const layoutProvider = new LayoutProvider(
    () => {
      return 0; // Assuming single view type
    },
    (type, dim, index) => {
      const isEvenIndex = index % 2 === 0;

      dim.width = screenWidth / numOfColumns;
      dim.height = cardWidth * 2;

      dim.x = isEvenIndex ? 0 : dim.width;
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <FilterSection
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <View>
        <RecyclerListView
          layoutProvider={layoutProvider}
          dataProvider={dataProvider.cloneWithRows(filteredStories)}
          rowRenderer={(type, data) => (
            <StoryCard story={data} width={cardWidth} />
          )}
          contentContainerStyle={{ marginTop: 5, paddingBottom: 100 }}
          renderAheadOffset={300}
        />
      </View>
    </SafeAreaView>
  );
};

export default stories;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#212121",
    flex: 1,
  },
});
