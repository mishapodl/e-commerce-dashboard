"use client";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}
export function AuthProvider({ children }: AuthProviderProps) {
  const initAuth = useAuthStore((state) => state.initAuth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      await initAuth();
      setLoading(false);
    }
    checkAuth();
  }, [initAuth]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
