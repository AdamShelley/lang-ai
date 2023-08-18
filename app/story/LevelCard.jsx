import { useCallback } from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import * as Haptics from "expo-haptics";
import { FONT, SIZES } from "../../constants";
import useSettingsStore from "../../state/store";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

const LevelCard = ({ title, topic, level, vote, part }) => {
  const router = useRouter();

  const haptics = useSettingsStore((state) => state.haptics);

  const handlePress = useCallback(
    (title) => {
      if (Platform.OS === "ios") {
        haptics && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } else {
        haptics &&
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      console.log(title);

      router.push(`/series/${title}`);
    },
    [haptics, router]
  );

  return (
    <>
      <View style={styles.levelCard(100, 20, null)}>
        <Text style={styles.level}>{topic}</Text>
      </View>
      <View style={styles.levelCard(50, 130, null)}>
        <Text style={styles.level}>{level}</Text>
      </View>
      {vote && (
        <View style={styles.levelCard(50, 190, null)}>
          <Text style={styles.level}>Vote</Text>
        </View>
      )}
      {part > 1 && (
        <Pressable
          onPress={() => handlePress(title)}
          style={[styles.levelCard(100, null, 20), styles.allParts]}
        >
          <FontAwesome5 name="list" size={SIZES.medium} color="#fff" />
          <Text style={[styles.level, styles.allPartsText]}>All parts</Text>
        </Pressable>
      )}
    </>
  );
};

export default LevelCard;

const styles = StyleSheet.create({
  levelCard: (width, left, right) => ({
    height: 40,
    width: width,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 20,
    left: left && left,
    right: right && right,
    zIndex: 5,
  }),
  level: {
    fontSize: SIZES.small,
    fontFamily: FONT.bold,
    color: "#212121",
    textTransform: "uppercase",
    letterSpacing: 0.2,
  },
  allParts: {
    backgroundColor: "#1a1a1a",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",
    width: "auto",
  },
  allPartsText: {
    color: "#f9f9f9",
    marginLeft: 10,
  },
});
