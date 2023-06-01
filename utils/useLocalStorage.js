import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLocalStorage = () => {
  const [localStories, setLocalStories] = useState();

  const getLocalStore = async (storeName) => {
    const store = await AsyncStorage.getItem(storeName);
    setLocalStories(store ? JSON.parse(store) : null);
    return store ? JSON.parse(store) : null;
  };

  const setLocalStore = async (storeName, value) => {
    await AsyncStorage.setItem(storeName, JSON.stringify(value));
  };

  return { localStories, getLocalStore, setLocalStore };
};
