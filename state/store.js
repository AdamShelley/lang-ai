import { create } from "zustand";

const useSettingsStore = create((set) => ({
  haptics: true,
  setHaptics: () => set((state) => ({ haptics: !state.haptics })),
}));

export default useSettingsStore;
