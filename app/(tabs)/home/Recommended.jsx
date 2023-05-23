import { View, Text, FlatList, StyleSheet } from "react-native";
import Card from "./Card";
import { data } from "../../../data";

import { FONT } from "../../../constants/fonts";

const Recommended = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Latest Stories</Text>

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => <Card story={item} wide={false} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 20,
          columnGap: 15,
        }}
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
    paddingHorizontal: 20,
  },
});
