import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
// import * as SecureStore from "expo-secure-store";
import { SUPABASE_URL, SUPABASE_API_KEY } from "@env";

// const ExpoSecureStoreAdapter = {
//   getItem: (key) => {
//     return SecureStore.getItemAsync(key);
//   },
//   setItem: (key, value) => {
//     SecureStore.setItemAsync(key, value);
//   },
//   removeItem: (key) => {
//     SecureStore.deleteItemAsync(key);
//   },
// };

const options = {
  localStorage: AsyncStorage,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY, {
  auth: {
    persistSession: false,
  },
});
