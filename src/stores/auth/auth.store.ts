import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AuthStatus, User } from "../../interfaces";
import { AuthService } from "../../services/auth.service";
import { getDevtoolsOptions } from "../generators/devtools-options.generator";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
}

interface Actions {
  loginUser: (email: string, password: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  logoutUser: () => void;
}

const INIT_DATA: AuthState = {
  status: "unauthorized",
  token: undefined,
  user: undefined,
};

const storeApi: StateCreator<
  AuthState & Actions,
  [["zustand/devtools", never]]
> = (set, get) => ({
  ...INIT_DATA,

  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);
      set({ token, user, status: "authorized" }, false, get().loginUser.name);
    } catch (e) {
      set(
        {
          ...INIT_DATA,
        },
        false,
        get().loginUser.name
      );
      throw new Error("unauthorized");
    }
  },

  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkStatus();
      set(
        { token, user, status: "authorized" },
        false,
        get().checkAuthStatus.name
      );
    } catch (error) {
      set(
        {
          ...INIT_DATA,
        },
        false,
        get().checkAuthStatus.name
      );
    }
  },

  logoutUser() {
    set(
      {
        ...INIT_DATA,
      },
      false,
      get().logoutUser.name
    );
  },
});

const storeName = "auth-store";

export const useAuthStore = create<AuthState & Actions>()(
  devtools(
    persist(storeApi, { name: storeName }),
    getDevtoolsOptions(storeName)
  )
);
