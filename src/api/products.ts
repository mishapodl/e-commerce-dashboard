import axios from "axios";
import { API_BASE_URL } from "./config";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

export type ProductFormData = Omit<Product, "id">;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchProductsAPI(params: {
  search?: string;
  limit?: number;
  skip?: number;
}) {
  const { search = "", limit = 12, skip = 0 } = params;

  const url = search
    ? `/products/search?q=${encodeURIComponent(search)}`
    : "/products";

  const response = await apiClient.get(url, {
    params: { limit, skip },
  });

  return response.data;
}

export async function fetchProductByIdAPI(id: number) {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch {
    return null;
  }
}

export async function deleteProductAPI(id: number) {
  const response = await apiClient.delete(`/products/${id}`);
  return response.data;
}

export async function createProductAPI(data: ProductFormData) {
  const response = await apiClient.post("/products/add", data);
  return response.data;
}

export async function updateProductAPI(id: number, data: ProductFormData) {
  const response = await apiClient.put(`/products/${id}`, data);
  return response.data;
}
