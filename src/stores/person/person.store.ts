import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getDevtoolsOptions } from "../generators/devtools-options.generator";
import { logger } from "../middlewares/logger.middleware";
import { firebaseStorage } from "../storages/firebase.storage";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

const storeApi: StateCreator<
  PersonState & Actions,
  [["zustand/devtools", never]]
> = (set) => ({
  firstName: "",
  lastName: "",
  setFirstName: (firstName: string) =>
    set({ firstName }, false, "setFirstName"),
  setLastName: (lastName: string) => set({ lastName }, false, "setLastName"),
});

export const usePersonStore = create<PersonState & Actions>()(
  logger(
    devtools(
      persist(storeApi, {
        name: "person-storage",
        storage: firebaseStorage,
      }),
      getDevtoolsOptions("person-store")
    )
  )
);
