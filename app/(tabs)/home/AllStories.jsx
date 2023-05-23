import { View, Text, StyleSheet, FlatList } from "react-native";
import { data } from "../../../data";
import Card from "./Card";

import { FONT } from "../../../constants/fonts";
import { useEffect, useState } from "react";
import Filter from "../../../components/Filter";

const AllStories = ({ ListHeaderComponent }) => {
  const [stories, setStories] = useState([]);
  const [showUnread, setShowUnread] = useState("All");

  useEffect(() => {
    setStories(data);
  }, [data]);

  useEffect(() => {
    if (showUnread === "Unread") {
      setStories(data.filter((story) => !story.read));
    } else if (showUnread === "Read") {
      setStories(data.filter((story) => story.read));
    } else {
      setStories(data);
    }
  }, [showUnread]);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={stories}
        renderItem={({ item }) => (
          <Card width={"90%"} wide={true} story={item} />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponentStyle={{ paddingHorizontal: 0 }}
        ListHeaderComponent={() => (
          <>
            {ListHeaderComponent}
            <Text style={styles.text}>Last week</Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {showUnread === "Read" ? (
                <Filter
                  text={"Unread"}
                  color="#fff"
                  size="20%"
                  onPress={() => setShowUnread("Unread")}
                />
              ) : (
                <Filter
                  text={"Read"}
                  size="20%"
                  color="#fff"
                  dark
                  onPress={() => setShowUnread("Read")}
                />
              )}

              <Filter
                text={"Show All"}
                size="20%"
                color="#fff"
                onPress={() => setShowUnread("All")}
                disabled={showUnread === "All"}
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
  },
});
