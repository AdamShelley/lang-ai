import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLocalStorage = () => {
  const getLocalStore = async (storeName) => {
    const store = await AsyncStorage.getItem(storeName);
    return store ? JSON.parse(store) : null;
  };

  const setLocalStore = async (storeName, value) => {
    await AsyncStorage.setItem(storeName, JSON.stringify(value));
  };

  return { getLocalStore, setLocalStore };
};
