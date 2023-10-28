import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getDevtoolsOptions } from "../generators/devtools-options.generator";
import {
  ConfirmationSlice,
  createConfirmationSlice,
} from "./confirmation.slice";
import { DateSlice, createDateSlice } from "./date.slice";
import { GuestSlice, createGuestSlice } from "./guest.slice";
import { PersonSlice, createPersonSlice } from "./person.slice";

type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;

const storeName = "weeding-store";

export const useWeedingBoundStore = create<ShareState>()(
  devtools(
    persist(
      (...a) => ({
        ...createPersonSlice(...a),
        ...createGuestSlice(...a),
        ...createDateSlice(...a),
        ...createConfirmationSlice(...a),
      }),
      { name: storeName }
    ),
    getDevtoolsOptions(storeName)
  )
);
