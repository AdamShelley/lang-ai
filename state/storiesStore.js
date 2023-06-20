import { create } from "zustand";

const useStoriesStore = create((set) => ({
  stories: [],
  setStories: (stories) => set({ stories }),
  levels: [],
  setLevels: (levels) => set({ levels }),
  genres: [],
  setGenres: (genres) => set({ genres }),
  isLoaded: false,
  setIsLoaded: (isLoaded) => set({ isLoaded }),
}));

export default useStoriesStore;
