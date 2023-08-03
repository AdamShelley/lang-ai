import { View, Text, FlatList, StyleSheet } from "react-native";
import Card from "./Card";
import { FONT, SIZES } from "../../../constants";
import { ActivityIndicator } from "react-native";
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

      {isLoaded ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={stories}
          renderItem={({ item }) => (
            <Card story={item} wide={false} theme={theme} />
          )}
          keyExtractor={(item) => item.gptId}
          contentContainerStyle={{
            paddingHorizontal: 20,
            columnGap: 15,
          }}
          horizontal
        />
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3]}
          renderItem={({ item }) => (
            <SkeletonLoader wide={false} theme={theme} />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingHorizontal: 20,
            columnGap: 15,
          }}
          horizontal
        />
      )}
    </View>
  );
};

export default Recommended;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  text: (theme) => ({
    color: theme.text,
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    paddingHorizontal: 20,
  }),
});
