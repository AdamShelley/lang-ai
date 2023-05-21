import { View, Text, StyleSheet, FlatList } from "react-native";
import { data } from "../../../data";
import Card from "./Card";
import { useRouter } from "expo-router";

const AllStories = () => {
  const router = useRouter();
  const handleStory = (id) => {
    router.push(`stories/${id}`);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>All Stories</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <Card width={180} handleStory={handleStory} story={item} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          columnGap: 10,
          marginTop: 20,
        }}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: "space-around",
          marginLeft: 10,
        }}
        numColumns={2}
      />
    </View>
  );
};

export default AllStories;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    marginLeft: 10,
  },
});
