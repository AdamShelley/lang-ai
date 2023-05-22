import { View, Text, StyleSheet, FlatList } from "react-native";
import { data } from "../../../data";
import Card from "./Card";
import { useRouter } from "expo-router";
import { FONT } from "../../../constants/fonts";

const AllStories = ({ ListHeaderComponent }) => {
  const router = useRouter();
  const handleStory = (id) => {
    router.push(`/stories/story/${id}`);
  };
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <Card
            width={"100%"}
            wide={true}
            handleStory={handleStory}
            story={item}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          columnGap: 10,
          marginTop: 5,
        }}
        ListHeaderComponent={() => (
          <>
            {ListHeaderComponent}
            <Text style={styles.text}>All Stories</Text>
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
    padding: 20,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    // marginLeft: 30,
    marginTop: 50,
    fontFamily: FONT.medium,
  },
});
