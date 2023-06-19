import { create } from "zustand";

const useStoriesStore = create((set) => ({
  stories: [],
  setStories: (stories) => set({ stories }),
  levels: [],
  setLevels: (levels) => set({ levels }),
  isLoaded: false,
  setIsLoaded: (isLoaded) => set({ isLoaded }),
}));

export default useStoriesStore;
