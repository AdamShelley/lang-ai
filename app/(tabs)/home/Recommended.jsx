import { View, Text, FlatList, StyleSheet } from "react-native";
import Card from "./Card";
import { FONT, SIZES } from "../../../constants";
import useStoriesStore from "../../../state/storiesStore";
import useSettingsStore from "../../../state/store";
import { darkTheme, lightTheme } from "../../../constants/theme";
import SkeletonLoader from "./SkeletonLoader";

const Recommended = ({ stories }) => {
  const isLoaded = useStoriesStore((state) => state.isLoaded);

  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={styles.container}>
      <Text style={styles.text(theme)}>Latest Stories</Text>

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={isLoaded ? stories : new Array(3).fill(null)}
        renderItem={({ item }) =>
          isLoaded ? (
            <Card story={item} wide={false} theme={theme} />
          ) : (
            <SkeletonLoader wide={false} theme={theme} />
          )
        }
        keyExtractor={(item, index) =>
          isLoaded ? item.gptId : index.toString()
        }
        contentContainerStyle={{
          paddingHorizontal: 20,
          columnGap: 10,
          paddingTop: 20,
        }}
        horizontal
      />
    </View>
  );
};

export default Recommended;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  text: (theme) => ({
    color: theme.text,
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    paddingHorizontal: 20,
  }),
});
