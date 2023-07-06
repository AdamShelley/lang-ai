import { create } from "zustand";

const useSettingsStore = create((set) => ({
  haptics: true,
  setHaptics: () => set((state) => ({ haptics: !state.haptics })),
  pinyin: false,
  setPinyin: () => set((state) => ({ pinyin: !state.pinyin })),
  textSize: "medium",
  setTextSize: (size) => set(() => ({ textSize: size })),
  isDarkMode: true,
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));

export default useSettingsStore;
