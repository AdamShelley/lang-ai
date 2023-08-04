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
        <View style={styles.overlay} />
        {wide && (
          <View style={styles.wideLevel}>
            <Text style={styles.levelText(theme)}>
              {story.level || "Unknown"}
            </Text>
          </View>
        )}
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
    borderTopRightRadius: wide ? 0 : 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: wide ? 10 : 0,
    borderBottomRightRadius: 0,
    overflow: "hidden",
    position: "relative",
    tintColor: wide ? "rgba(255, 255, 255, 0.6)" : "none",
  }),

  image: (wide) => ({
    height: "100%",
    borderTopRightRadius: wide ? 0 : 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: wide ? 10 : 0,
    resizeMode: "cover",
  }),
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  wideLevel: {
    padding: 5,
    backgroundColor: "#212121",
    borderRadius: 10,
    borderWidth: 0,
    borderColor: "#313131",
    position: "absolute",
    bottom: 2,
    left: "10%",
    right: "10%",
    textAlign: "center",
    alignSelf: "center",
    shadowColor: "rgba(0,0,0,0.9)",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },
  levelText: (theme) => ({
    color: theme.text,
    fontSize: SIZES.regular,
    fontWeight: 400,
    fontFamily: FONT.medium,
    textAlign: "center",
    alignSelf: "center",
    textTransform: "uppercase",
  }),
});
