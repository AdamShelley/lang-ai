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

const stories = () => {
  // Screen Width
  const screenWidth = Dimensions.get("window").width;
  // Card width (40%)
  const cardWidth = screenWidth * 0.4;

  const stories = useStoriesStore((state) => state.stories);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={stories}
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
