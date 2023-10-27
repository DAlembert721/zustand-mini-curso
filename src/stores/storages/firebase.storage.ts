import { StateStorage, createJSONStorage } from "zustand/middleware";

const firebaseUrl = "https://zustand-dev-default-rtdb.firebaseio.com/zustand";
/* const controller = new AbortController();
const signal = controller.signal; */

const storageAPI: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) =>
        res.json()
      );
      return JSON.stringify(data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    //controller.abort();
    const data = await fetch(`${firebaseUrl}/${name}.json`, {
      method: "PUT",
      body: value,
      //signal: signal,
    }).then((res) => res.json());
    return;
  },
  removeItem: async function (name: string): Promise<void> {
    const data = await fetch(`${firebaseUrl}/${name}.json`, {
      method: "PUT",
    }).then((res) => res.json());
    return;
  },
};

export const firebaseStorage = createJSONStorage(() => storageAPI);
