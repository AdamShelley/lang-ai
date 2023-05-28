import { create } from "zustand";

const useStoriesStore = create((set) => ({
  stories: [],
  setStories: (stories) => set((state) => ({ stories: stories })),
}));

export default useStoriesStore;
