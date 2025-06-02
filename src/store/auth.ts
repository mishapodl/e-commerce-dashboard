import { create } from "zustand";

export type User = {
  id: number;
  username: string;
  email: string;
  token: string;
};

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
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error("Неверные данные");
    }

    const data = await res.json();
    const user: User = {
      id: data.id,
      username: data.username,
      email: data.email,
      token: data.accessToken,
    };

    localStorage.setItem("token", user.token);
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, isAuthenticated: false });
  },

  initAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("https://dummyjson.com/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Invalid token");

      const data = await res.json();

      set({
        user: { ...data, token },
        isAuthenticated: true,
      });
    } catch (err) {
      // В режиме разработки можно логировать ошибку:
      if (process.env.NODE_ENV === "development") {
        console.error("Auth init error:", err);
      }
      localStorage.removeItem("token");
      set({ user: null, isAuthenticated: false });
    }
  },
}));
