import { create } from "zustand";
import {
  ProductFormData,
  fetchProductsAPI,
  fetchProductByIdAPI,
  deleteProductAPI,
  createProductAPI,
  updateProductAPI,
} from "@/api/products";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

type ProductState = {
  products: Product[];
  total: number;
  loading: boolean;

  search: string;
  sortBy: "title" | "price";
  page: number;

  setSearch: (search: string) => void;
  setSortBy: (sortBy: "title" | "price") => void;
  setPage: (page: number) => void;

  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<Product | null>;

  deleteProduct: (id: number) => Promise<void>;
  createProduct: (data: ProductFormData) => Promise<Product>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateProduct: (id: any, data: ProductFormData) => Promise<Product>;
};

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  total: 0,
  loading: false,

  search: "",
  sortBy: "title",
  page: 1,

  setSearch: (search) => set({ search, page: 1 }),
  setSortBy: (sortBy) => set({ sortBy, page: 1 }),
  setPage: (page) => set({ page }),

  fetchProducts: async () => {
    set({ loading: true });
    const { search, sortBy, page } = get();

    try {
      const limit = 12;
      const skip = (page - 1) * limit;

      const data = await fetchProductsAPI({ search, limit, skip });

      const sortedProducts = [...data.products].sort((a, b) => {
        if (sortBy === "title") return a.title.localeCompare(b.title);
        if (sortBy === "price") return a.price - b.price;
        return 0;
      });

      set({
        products: sortedProducts,
        total: data.total,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true });
    try {
      const product = await fetchProductByIdAPI(id);
      set({ loading: false });
      return product;
    } catch {
      set({ loading: false });
      return null;
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await deleteProductAPI(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        total: state.total - 1,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  createProduct: async (data) => {
    set({ loading: true });
    try {
      const newProduct = await createProductAPI(data);
      await get().fetchProducts();
      return newProduct;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id, data) => {
    set({ loading: true });
    try {
      const updatedProduct = await updateProductAPI(id, data);
      await get().fetchProducts();
      return updatedProduct;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
