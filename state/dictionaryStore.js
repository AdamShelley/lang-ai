import { create } from "zustand";

const useDictionaryStore = create((set) => ({
  words: [],
  setWords: (words) => set({ words }),
}));

export default useDictionaryStore;
