import { Image, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { FONT } from "../constants";

const DEFAULT_IMAGE_URI =
  "https://plus.unsplash.com/premium_photo-1674713054504-4a6e71d26d29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80";

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
        uri: imageURL ? imageURL : DEFAULT_IMAGE_URI,
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
