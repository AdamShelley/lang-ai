import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  alert("Storage cleared");
  console.log("Done.");
};
