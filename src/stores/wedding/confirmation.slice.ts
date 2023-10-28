import { StateCreator } from "zustand";

export interface ConfirmationSlice {
  isConfirmed: boolean;
  setIsConfirmed: (isConfirmed: boolean) => void;
}

export const createConfirmationSlice: StateCreator<
  ConfirmationSlice,
  [["zustand/devtools", never]]
> = (set, get) => ({
  isConfirmed: false,
  setIsConfirmed: (isConfirmed: boolean) =>
    set({ isConfirmed }, false, get().setIsConfirmed.name),
});
