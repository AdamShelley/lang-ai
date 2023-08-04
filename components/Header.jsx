import { Image, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { FONT, DEFAULT_IMAGE } from "../constants";

const Header = ({
  imageURL,
  headerTitle,
  backgroundColor,
  tintColor,
  fontSize,
}) => (
  <>
    <Image
      source={{
        uri: imageURL ? imageURL : DEFAULT_IMAGE,
      }}
      style={styles.image}
      alt="story-image"
    />
    <Stack.Screen
      options={{
        headerTitle: headerTitle,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTintColor: tintColor,
        headerTitleStyle: {
          fontSize: fontSize,
          fontFamily: FONT.medium,
          color: tintColor,
        },
      }}
    />
  </>
);

export default Header;

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    position: "absolute",
    opacity: 0.1,
  },
});
