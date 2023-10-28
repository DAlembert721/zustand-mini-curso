import { StateCreator } from "zustand";

export interface PersonSlice {
  firstName: string;
  lastName: string;

  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

export const createPersonSlice: StateCreator<
  PersonSlice,
  [["zustand/devtools", never]]
> = (set, get) => ({
  firstName: "",
  lastName: "",

  setFirstName: (firstName: string) =>
    set({ firstName }, false, get().setFirstName.name),
  setLastName: (lastName: string) =>
    set({ lastName }, false, get().setLastName.name),
});
