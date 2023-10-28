import { StateCreator } from "zustand";
export interface DateSlice {
  eventDate: number; // number string primitivo
  eventYYYYMMDD: () => string;
  eventHHMM: () => string;
  setEventDate: (partialDate: string) => void;
  setEventTime: (eventTime: string) => void;
}

export const createDateSlice: StateCreator<
  DateSlice,
  [["zustand/devtools", never]]
> = (set, get) => ({
  eventDate: new Date().getTime(),
  eventYYYYMMDD: () => {
    const date = new Date(get().eventDate);
    return date.toISOString().split("T")[0];
  },
  eventHHMM() {
    const eventDate = new Date(get().eventDate);
    const hours = eventDate.getHours().toString().padStart(2, "0");
    const minutes = eventDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  },
  setEventDate: (partialDate: string) =>
    set(
      (state) => {
        const date = new Date(partialDate);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate() + 1;
        const newDate = new Date(state.eventDate);
        newDate.setFullYear(year, month, day);
        return {
          eventDate: newDate.getTime(),
        };
      },
      false,
      get().setEventDate.name
    ),
  setEventTime: (eventTime: string) =>
    set(
      (state) => {
        const [hours, minutes] = eventTime.split(":");
        const newDate = new Date(state.eventDate);
        newDate.setHours(parseInt(hours), parseInt(minutes));
        return { eventDate: newDate.getTime() };
      },
      false,
      get().setEventTime.name
    ),
});
