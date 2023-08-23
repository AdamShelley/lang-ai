import { useCallback, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { DEFAULT_IMAGE, FONT, SIZES } from "../../../constants";

const CardImage = ({ wide, theme, story }) => {
  const [imageUrl, setImageUrl] = useState(story?.imageUrl || DEFAULT_IMAGE);

  const onErrorImage = useCallback(() => {
    setImageUrl(DEFAULT_IMAGE);
  }, []);

  return (
    <View style={styles.imageContainer(wide)}>
      <View style={{ alignSelf: "stretch" }}>
        <Image
          source={{
            uri: imageUrl,
          }}
          onError={onErrorImage}
          style={styles.image(wide)}
          resizeMode="cover"
          alt="story-image"
        />
      </View>
    </View>
  );
};

export default CardImage;

const styles = StyleSheet.create({
  imageContainer: (wide) => ({
    width: wide ? "30%" : "100%", // Smaller container if wide card
    minWidth: 10,
    height: wide ? "100%" : "60%",
    borderTopRightRadius: wide ? 0 : 2,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    position: "relative",
    tintColor: wide ? "rgba(255, 255, 255, 0.6)" : "none",
    overflow: "hidden",
  }),

  image: (wide) => ({
    height: "100%",
    borderRadius: wide ? 10 : 0,
    resizeMode: "cover",
  }),
});
