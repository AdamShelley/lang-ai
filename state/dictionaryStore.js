import { create } from "zustand";

const useDictionaryStore = create((set) => ({
  words: [],
  setWords: (words) => set({ words }),
  initialize: async (fetchFunction) => {
    const data = await fetchFunction();
    set({ words: data });
  },
}));

export default useDictionaryStore;
