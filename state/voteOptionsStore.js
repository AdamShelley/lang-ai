import { create } from "zustand";

const useVoteOptionsStore = create((set) => ({
  selectedOption: -1,
  submitted: false,
  selectOption: (index) => set({ selectedOption: index }),
  submit: () => set({ submitted: true }),
}));

export default useVoteOptionsStore;
