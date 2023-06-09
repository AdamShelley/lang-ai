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
    return null;
  }
};
