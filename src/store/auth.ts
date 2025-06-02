import { create } from "zustand";
import { User, loginAPI, fetchCurrentUserAPI } from "@/api/auth";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;

  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (username, password) => {
    try {
      const user = await loginAPI(username, password);
      localStorage.setItem("token", user.token);
      set({ user, isAuthenticated: true });
    } catch {
      throw new Error("Неверные данные");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, isAuthenticated: false });
  },

  initAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const userData = await fetchCurrentUserAPI(token);
      set({ user: { ...userData, token }, isAuthenticated: true });
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("Auth init error:", err);
      }
      localStorage.removeItem("token");
      set({ user: null, isAuthenticated: false });
    }
  },
}));
