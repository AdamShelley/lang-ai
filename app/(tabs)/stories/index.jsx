import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Card from "../home/Card";
import { data } from "../../../data";
import { useRouter } from "expo-router";

const stories = () => {
  const router = useRouter();

  const handleStory = (id) => {
    router.push(`/stories/story/${id}`);
  };

  // Screen Width
  const screenWidth = Dimensions.get("window").width;
  // Card width (40%)
  const cardWidth = screenWidth * 0.4;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>All Stories</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <Card handleStory={handleStory} story={item} width={cardWidth} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ marginTop: 5 }}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: "space-evenly",
            marginTop: 10,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default stories;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: "#212124",
  },
  text: {
    marginTop: 20,
    color: "#fff",
    fontSize: 20,
    // marginLeft: 10,
  },
});
