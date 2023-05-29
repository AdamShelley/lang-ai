import { create } from "zustand";

const useDictionaryStore = create((set) => ({
  words: [],
  setWords: (words) => set((state) => ({ words: words })),
}));

export default useDictionaryStore;
