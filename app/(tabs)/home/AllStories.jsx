import { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Card from "./Card";
import { FONT } from "../../../constants/fonts";
import { darkTheme, lightTheme } from "../../../constants/theme";
import { useState } from "react";
import Filter from "../../../components/Filter";
import useSettingsStore from "../../../state/store";
import { useRouter } from "expo-router";
import { SIZES } from "../../../constants";

const AllStories = ({ ListHeaderComponent, stories, refreshControl }) => {
  const [storiesToShow, setStoriesToShow] = useState(stories);
  const router = useRouter();
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

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
              <Text style={styles.text(theme)}>Last week</Text>
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
  text: (theme) => ({
    color: theme.text,
    fontSize: SIZES.large,
    marginTop: 50,
    fontFamily: FONT.regular,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  }),
});
