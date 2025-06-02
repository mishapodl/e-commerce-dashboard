import axios from "axios";
import { API_BASE_URL } from "./config";

export type User = {
  id: number;
  username: string;
  email: string;
  token: string;
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function loginAPI(
  username: string,
  password: string
): Promise<User> {
  const response = await apiClient.post("/auth/login", { username, password });
  const data = response.data;
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    token: data.accessToken,
  };
}

export async function fetchCurrentUserAPI(
  token: string
): Promise<Omit<User, "token">> {
  const response = await apiClient.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
