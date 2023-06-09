import { create } from "zustand";

const useStoriesStore = create((set) => ({
  stories: [],
  isLoading: false,
  setStories: (stories) => set({ stories }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useStoriesStore;
