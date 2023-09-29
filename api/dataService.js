import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LIVE_URL } from "@env";
import {
  isValidStoriesData,
  isValidDictionaryData,
} from "../utils/checkValidArrayOrObject";
import useSettingsStore from "../state/store";

const { getTimestamp, shouldUpdate } = require("../utils/shouldUpdate");
const settingsStore = useSettingsStore.getState();

export const fetchDataFromServer = async (
  endpoint,
  storageKey,
  forceFetch = false
) => {
  // Check NETWORK status
  const networkStatus = await NetInfo.fetch();

  // For testing purposes
  // let networkStatus = {
  //   isConnected: false,
  // };

  // Get language from zustand
  const language = settingsStore.language;

  if (!networkStatus.isConnected) {
    console.log("No network connection");
    const dataFromStorage = await getDataFromStorage(storageKey);
    if (dataFromStorage && Object.keys(dataFromStorage).length > 0) {
      console.log(`Using local storage ${storageKey}`);
      return dataFromStorage;
    }
    console.error("No network and no data in local storage");
    return getDefaultDataForStorageKey(storageKey);
  }

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
  return await fetchAndUpdateData(
    endpoint,
    storageKey,
    lastUpdateKey,
    lastUpdate,
    language
  );
};

// Fetch Data from Server
const fetchAndUpdateData = async (
  endpoint,
  storageKey,
  lastUpdateKey,
  lastUpdate,
  language = "zh"
) => {
  try {
    const url =
      endpoint === "stories"
        ? `${LIVE_URL}/${endpoint}?lastUpdate=${lastUpdate}?language=${language}`
        : `${LIVE_URL}/${endpoint}?language=${language}`;

    const response = await fetch(url);

    const data = await response.json();

    // Merge data from server with existing data
    const existingData = await getDataFromStorage(storageKey);
    const mergedData = { ...existingData, ...data };

    // Save to Async Storage
    await updateLocalStorage(storageKey, mergedData);
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
