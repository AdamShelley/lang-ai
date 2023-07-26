// dictionaryService.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL_DEV, LIVE_URL } from "@env";
import moment from "moment";

// Check Time to UPDATE On Frontend
const { getTimestamp, shouldUpdate } = require("../utils/shouldUpdate");

export const fetchDictionaryFromServer = async (forceFetch = false) => {
  try {
    const lastUpdate = await AsyncStorage.getItem("lastUpdateWords");
    const shouldUpdateStories = lastUpdate ? parseInt(lastUpdate, 10) : null;

    // Check if a dictionary is already in the async storage
    const dictionaryFromStorage = await AsyncStorage.getItem("dictionary");

    if (
      dictionaryFromStorage?.length &&
      !forceFetch &&
      !shouldUpdate(shouldUpdateStories)
    ) {
      console.log("Using local storage Dictionary");
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

// const fetchNewWords = async () => {
//   console.log("Updating word list");
//   try {
//     // GET Updated dictionary
//     const localDictionary =
//       await dictionaryService.getDictionaryFromStorage();

//     // Get the last fetched timestamp of the dictionary object

//     const firstKey = Object.keys(localDictionary)[0];

//     const lastFetchedTimestamp = localDictionary[firstKey].created_at;
//     const formattedTimestamp = moment(lastFetchedTimestamp).format(
//       "YYYY-MM-DD HH:mm:ss.SSSSSSZZ"
//     );
//     // Save new dictionary rows to local storage

//     const { data: newDictionaryRows, error } = await supabase
//       .from("dictionary")
//       .select("*")
//       .gte("created_at", formattedTimestamp);

//     if (error) {
//       console.log("Error fetching new dictionary rows (from DB)");
//       console.log(error);
//     }

//     if (newDictionaryRows) {
//       const newDictionaryObject = newDictionaryRows.reduce((acc, row) => {
//         acc[row.chineseWord] = row;
//         return acc;
//       }, {});

//       await AsyncStorage.removeItem("dictionary");

//       const newData = { ...newDictionaryObject, ...localDictionary };
//       await dictionaryService.updateLocalStorage(newData);
//       await dictionaryService.fetchDictionaryFromServer(false, newData);
//       // Update the dictionary in the dictionary store
//       setWords(newData);
//     }
//   } catch (error) {
//     console.log(error);
//     console.log("Error in fetching new dictionary rows (from func)");
//   }
// };
