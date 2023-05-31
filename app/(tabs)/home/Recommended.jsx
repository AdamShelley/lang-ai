import { View, Text, FlatList, StyleSheet } from "react-native";
import Card from "./Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FONT } from "../../../constants/fonts";

const Recommended = ({ stories }) => {
  // Get read state from stories in asyncStorage

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Latest Stories</Text>

      {stories ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={stories}
          renderItem={({ item }) => <Card story={item} wide={false} />}
          keyExtractor={(item) => item.gptId}
          contentContainerStyle={{
            paddingHorizontal: 20,
            columnGap: 15,
          }}
          horizontal
        />
      ) : (
        <Text>Loading...</Text>
      )}
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
    paddingHorizontal: 20,
  },
});
