import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const SkeletonLoader = () => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  return (
    <View style={styles.skeletonContainer}>
      <ShimmerPlaceholder
        style={styles.skeletonImage}
        shimmerColors={["#1a1a1a", "#2a2a2a", "#1a1a1a"]}
      />
      <View style={styles.skeletonContent}>
        <ShimmerPlaceholder
          style={styles.skeletonLine}
          shimmerColors={["#575757", "#eee", "#575757"]}
        />
        <ShimmerPlaceholder
          style={[styles.skeletonLine, { height: 30, marginTop: 10 }]}
          shimmerColors={["#575757", "#eee", "#575757"]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 200,
    height: 300,
    minHeight: 300,
    marginTop: 20,
    paddingHorizontal: 5,
  },
  skeletonImage: {
    width: "90%",
    height: "50%",
    borderRadius: 30,
    backgroundColor: "#323232",
    alignSelf: "center",
  },
  skeletonContent: {
    marginTop: 10,
    flex: 1,
    width: "100%",
    alignContent: "center",
    paddingHorizontal: 10,
  },
  skeletonLine: {
    width: "100%",
    borderRadius: 30,
    height: 20,
    marginTop: 5,
    backgroundColor: "#424242",
  },
});

export default SkeletonLoader;
