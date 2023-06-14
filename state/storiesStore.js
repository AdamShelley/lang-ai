import { create } from "zustand";

const useStoriesStore = create((set) => ({
  stories: [],
  levels: [],
  setLevels: (levels) => set({ levels }),
  isLoading: false,
  setStories: (stories) => set({ stories }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useStoriesStore;
