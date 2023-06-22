import { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Card from "./Card";
import { FONT } from "../../../constants/fonts";
import { useState } from "react";
import Filter from "../../../components/Filter";
import useStoriesStore from "../../../state/storiesStore";
import { useRouter } from "expo-router";

const AllStories = ({ ListHeaderComponent, stories, refreshControl }) => {
  const [storiesToShow, setStoriesToShow] = useState(stories);
  const router = useRouter();

  useEffect(() => {
    setStoriesToShow(stories);
  }, [stories]);

  return (
    <View style={styles.container}>
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
              <Text style={styles.text}>Last week</Text>
              <Filter
                text={"Show All"}
                size="100%"
                color="#fff"
                onPress={() => router.push(`/stories`)}
              />
            </View>
          </>
        )}
      />
    </View>
  );
};

export default AllStories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    marginTop: 50,
    fontFamily: FONT.regular,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  },
});
