"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const usernameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(username, password);
      router.replace("/products");
    } catch {
      setError("Invalid login or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg w-full max-w-md shadow-lg"
        aria-describedby="login-error"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

        <Input
          id="username"
          label="User name"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          ref={usernameInputRef}
          autoComplete="username"
          required
          error={null}
        />

        <Input
          id="password"
          label="Pssword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          error={null}
        />

        {error && (
          <p id="login-error" className="text-red-400 mb-4 text-center">
            {error}
          </p>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Login..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
