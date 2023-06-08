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
import { RecyclerListView } from "recyclerlistview";

const stories = () => {
  // State
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Screen Width
  const screenWidth = Dimensions.get("window").width;
  // Card width (40%)
  const cardWidth = screenWidth * 0.45;

  const allStories = useStoriesStore((state) => state.stories);

  console.log(allStories);

  const filteredStories = useMemo(() => {
    if (selectedGenre === "All") {
      return allStories;
    } else {
      return allStories.filter(
        (story) => story.topic.toLowerCase() === selectedGenre.toLowerCase()
      );
    }
  }, [selectedGenre, allStories]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <FilterSection
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <View>
        {/* <RecyclerListView
          // layoutProvider={}
          dataProvider={filteredStories}
          rowRenderer={(type, data) => (
            <StoryCard story={data} width={cardWidth} />
          )}
        /> */}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredStories}
          renderItem={({ item }) => (
            <StoryCard story={item} width={cardWidth} />
          )}
          keyExtractor={(item) => item.gptId}
          numColumns={2}
          contentContainerStyle={{ marginTop: 5 }}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
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
