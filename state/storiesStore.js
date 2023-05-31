import { create } from "zustand";

const useStoriesStore = create((set) => ({
  stories: [],
  localStorageStories: [],
  setStories: (stories) => set((state) => ({ stories: stories })),
  setLocalStorageStories: (stories) =>
    set((state) => ({ localStorageStories: stories })),
}));

export default useStoriesStore;
