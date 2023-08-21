import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { darkTheme, lightTheme } from "../../../constants/theme";
import { SIZES, FONT } from "../../../constants";
import useSettingsStore from "../../../state/store";
import useStoriesStore from "../../../state/storiesStore";
import Card from "./Card";
import SkeletonLoader from "./SkeletonLoader";

const AllStories = ({ ListHeaderComponent, stories, refreshControl }) => {
  const [storiesToShow, setStoriesToShow] = useState(stories);
  const isLoaded = useStoriesStore((state) => state.isLoaded);
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  // Check for stories to show that are within the last week
  const lastWeeksStories = storiesToShow.filter((story) => {
    const storyDate = new Date(story.created);
    const today = new Date();
    const lastWeek = new Date(today.setDate(today.getDate() - 7));

    return storyDate > lastWeek;
  });

  useEffect(() => {
    setStoriesToShow(stories);
  }, [stories]);

  const headerComponent = (
    <>
      {ListHeaderComponent}
      <View
        style={{
          flexDirection: "row",
          alignItems: "space-between",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.text(theme)}>Last week</Text>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={refreshControl}
        showsVerticalScrollIndicator={false}
        data={isLoaded ? lastWeeksStories.slice(5) : new Array(3).fill(null)} // Only show 7 stories on home page.
        renderItem={({ item }) =>
          isLoaded ? (
            <Card width={"90%"} wide={true} story={item} />
          ) : (
            <SkeletonLoader width={"90%"} wide theme={theme} />
          )
        }
        contentContainerStyle={{ paddingBottom: 50 }}
        keyExtractor={(item, index) =>
          isLoaded ? item.gptId : index.toString()
        }
        ListHeaderComponentStyle={{ paddingHorizontal: 0 }}
        ListHeaderComponent={headerComponent}
      />
    </View>
  );
};

export default AllStories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: (theme) => ({
    color: theme.text,
    fontSize: SIZES.medium,
    marginTop: 50,
    fontFamily: FONT.regular,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  }),
});
