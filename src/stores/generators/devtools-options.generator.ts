import { DevtoolsOptions } from "zustand/middleware";

export const getDevtoolsOptions = (storeName: string): DevtoolsOptions => {
  const options: DevtoolsOptions = {
    enabled: import.meta.env.DEV,
    name: "mi-store",
    store: storeName,
  };
  return options;
};
