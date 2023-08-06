// dictionaryService.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL_DEV, LIVE_URL } from "@env";

// Check Time to UPDATE On Frontend
const { getTimestamp, shouldUpdate } = require("../utils/shouldUpdate");

export const fetchDictionaryFromServer = async (forceFetch = false) => {
  try {
    const lastUpdate = await AsyncStorage.getItem("lastUpdateWords");
    const shouldUpdateDictionary = lastUpdate ? parseInt(lastUpdate, 10) : null;

    // Check if a dictionary is already in the async storage
    const dictionaryFromStorage = await AsyncStorage.getItem("dictionary");

    // Check if update is required or if forceFetch is set to true
    const updateRequired = shouldUpdate(shouldUpdateDictionary) || forceFetch;

    if (dictionaryFromStorage?.length && !updateRequired) {
      console.log("Using local storage Dictionary");
      console.log(JSON.parse(dictionaryFromStorage.length));
      return JSON.parse(dictionaryFromStorage);
    } else {
      console.log("FETCHING DICTIONARY FROM SERVER");
      const response = await fetch(`${LIVE_URL}/def`);
      const data = await response.json();

      // Save the dictionary to local storage
      await AsyncStorage.setItem("dictionary", JSON.stringify(data));

      const timestamp = getTimestamp();
      await AsyncStorage.setItem("lastUpdateWords", timestamp.toString());
      return data;
    }
  } catch (error) {
    console.log("----fetch DICT from server");
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
  return {};
};

export const updateLocalStorage = async (newData) => {
  try {
    // Update local storage with new data
    await AsyncStorage.setItem("dictionary", JSON.stringify(newData));
  } catch (error) {
    console.error("Error updating local storage:", error);
  }
};
