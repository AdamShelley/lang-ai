import { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Card from "./Card";
import { FONT } from "../../../constants/fonts";
import { darkTheme, lightTheme } from "../../../constants/theme";
import { useState } from "react";
import useSettingsStore from "../../../state/store";
import { SIZES } from "../../../constants";
import SkeletonLoader from "./SkeletonLoader";
import useStoriesStore from "../../../state/storiesStore";

const AllStories = ({ ListHeaderComponent, stories, refreshControl }) => {
  const [storiesToShow, setStoriesToShow] = useState(stories);
  const isLoaded = useStoriesStore((state) => state.isLoaded);
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    setStoriesToShow(stories);
  }, [stories]);

  return (
    <View style={styles.container}>
      {isLoaded ? (
        <FlatList
          refreshControl={refreshControl}
          showsVerticalScrollIndicator={false}
          data={storiesToShow.slice(5, 12)} // Only show 7 stories on home page.
          renderItem={({ item }) => (
            <Card width={"90%"} wide={true} story={item} />
          )}
          contentContainerStyle={{ paddingBottom: 50 }}
          keyExtractor={(item) => item.gptId}
          ListHeaderComponentStyle={{ paddingHorizontal: 0 }}
          ListHeaderComponent={() => (
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
          )}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[1, 2, 3, 4, 5]}
          renderItem={({ item }) => (
            <SkeletonLoader width={"90%"} wide theme={theme} />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingHorizontal: 20,
            columnGap: 15,
          }}
          ListHeaderComponentStyle={{ paddingHorizontal: 0 }}
          ListHeaderComponent={() => (
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
          )}
        />
      )}
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
    fontSize: SIZES.large,
    marginTop: 50,
    fontFamily: FONT.regular,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  }),
});
