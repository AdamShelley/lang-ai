import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useSettingsStore = create(
  persist(
    (set, get) => ({
      language: "zh",
      setLanguage: (language) => set({ language: language }),
      hasSeenOverlay: false,
      setHasSeenOverlay: () => set({ hasSeenOverlay: true }),
      showStoryOnboarding: true,
      setShowStoryOnboarding: () => set({ showStoryOnboarding: false }),
      haptics: true,
      setHaptics: () => set({ haptics: !get().haptics }),
      pinyin: false,
      setPinyin: () => set({ pinyin: !get().pinyin }),
      textSize: "medium",
      setTextSize: (textSize) => set({ textSize: textSize }),
      isDarkMode: true,
      toggleTheme: () => set({ isDarkMode: !get().isDarkMode }),
      hideReadStories: false,
      setHideReadStories: () =>
        set({ hideReadStories: !get().hideReadStories }),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useSettingsStore;
