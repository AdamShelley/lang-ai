import { View, Text, FlatList, StyleSheet } from "react-native";
import Card from "./Card";
import { data } from "../../../data";
import { useRouter } from "expo-router";
import { FONT } from "../../../constants/fonts";

const Recommended = () => {
  const router = useRouter();

  const handleStory = (id) => {
    router.push(`/stories/story/${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Latest Stories</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <Card handleStory={handleStory} story={item} wide={false} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ columnGap: 10, marginTop: 5 }}
        horizontal
      />
    </View>
  );
};

export default Recommended;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontFamily: FONT.regular,
    // marginLeft: 10,
  },
});
