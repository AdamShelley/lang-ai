// dictionaryService.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL_DEV } from "@env";

export const fetchDictionaryFromServer = async () => {
  try {
    // Check if a dictionary is already in the async storage
    const dictionaryFromStorage = await AsyncStorage.getItem("dictionary");
    if (dictionaryFromStorage) {
      console.log("Using local storage Dictionary");
      return JSON.parse(dictionaryFromStorage);
    } else {
      console.log("FETCHING DICTIONARY FROM SERVER");
      const response = await fetch(`${URL_DEV}/def`);
      const data = await response.json();

      // Save the dictionary to local storage
      await AsyncStorage.setItem("dictionary", JSON.stringify(data));

      return data;
    }
  } catch (error) {
    console.error(error);
    console.error(error.message);
    console.log(error.stack);
    return null;
  }
};

export const getDictionaryFromStorage = async () => {
  const dictionaryFromStorage = await AsyncStorage.getItem("dictionary");
  if (dictionaryFromStorage) {
    return JSON.parse(dictionaryFromStorage);
  }
  return null;
};

export const updateLocalStorage = async (newData) => {
  try {
    // Update local storage with new data
    await AsyncStorage.setItem("dictionary", JSON.stringify(newData));
  } catch (error) {
    console.error("Error updating local storage:", error);
  }
};
