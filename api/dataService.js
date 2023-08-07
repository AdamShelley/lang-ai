import AsyncStorage from "@react-native-async-storage/async-storage";
import { LIVE_URL } from "@env";
import {
  isValidStoriesData,
  isValidDictionaryData,
} from "../utils/checkValidArrayOrObject";

const { getTimestamp, shouldUpdate } = require("../utils/shouldUpdate");

export const fetchDataFromServer = async (
  endpoint,
  storageKey,
  forceFetch = false
) => {
  // Create a key for the last time we updated this data from the server
  // Check if we should update the data from the server or force fetch = true
  const lastUpdateKey = getLastUpdateKey(storageKey);
  const lastUpdate = await getDataFromStorage(lastUpdateKey);
  const shouldUpdateData = lastUpdate ? parseInt(lastUpdate, 10) : null;
  const dataFromStorage = await getDataFromStorage(storageKey);
  const updateRequired = shouldUpdate(shouldUpdateData) || forceFetch;

  // If we have valid data in local storage and we don't need to update it, use it
  // Otherwise, fetch the data from the server and update local storage
  if (
    isValidDataForStorageKey(storageKey, dataFromStorage) &&
    !updateRequired
  ) {
    console.log(`Using local storage ${storageKey}`);
    return dataFromStorage;
  }

  console.log(`FETCHING ${storageKey} FROM SERVER`);
  return await fetchAndUpdateData(endpoint, storageKey, lastUpdateKey);
};

// Fetch Data from Server
const fetchAndUpdateData = async (endpoint, storageKey, lastUpdateKey) => {
  try {
    const response = await fetch(`${LIVE_URL}/${endpoint}`);
    const data = await response.json();

    // Save to Async Storage
    await updateLocalStorage(storageKey, data);
    await updateLocalStorage(lastUpdateKey, getTimestamp().toString());
    return data;
  } catch (error) {
    console.log(`Error in fetching ${storageKey} from server.`, error);
    return null;
  }
};

// Async (Local) Storage Functionality
export const getDataFromStorage = async (storageKey) => {
  const getDataFromStorage = await AsyncStorage.getItem(storageKey);

  if (getDataFromStorage) {
    const parsedData = JSON.parse(getDataFromStorage);
    if (isValidDataForStorageKey(storageKey, parsedData)) return parsedData;
  }
  return getDefaultDataForStorageKey(storageKey);
};

const isValidDataForStorageKey = (storageKey, data) => {
  const validators = {
    stories: isValidStoriesData,
    dictionary: isValidDictionaryData,
  };

  const validate = validators[storageKey];
  return validate ? validate(data) : true;
};

const getDefaultDataForStorageKey = (storageKey) => {
  const defaults = {
    stories: [],
    dictionary: {},
  };

  return storageKey.startsWith("lastUpdate")
    ? null
    : defaults[storageKey] || null;
};

export const updateLocalStorage = async (storageKey, newData) => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
  } catch (error) {
    console.error("Error updating local storage:", error);
  }
};

const getLastUpdateKey = (storageKey) => {
  return `lastUpdate${
    storageKey.charAt(0).toUpperCase() + storageKey.slice(1)
  }`;
};
