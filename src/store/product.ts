import { create } from "zustand";

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
};

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  total: 0,
  loading: false,

  search: "",
  sortBy: "title",
  page: 1,

  setSearch: (search) => set({ search, page: 1 }), // сбрасываем страницу при поиске
  setSortBy: (sortBy) => set({ sortBy, page: 1 }), // сбрасываем страницу при сортировке
  setPage: (page) => set({ page }),

  fetchProducts: async () => {
    set({ loading: true });
    const { search, sortBy, page } = get();

    try {
      const limit = 12;
      const skip = (page - 1) * limit;

      const searchQuery = search
        ? `/search?q=${encodeURIComponent(search)}`
        : "";
      // В DummyJSON API нет параметра сортировки, нужно сортировать локально после fetch

      const response = await fetch(
        `https://dummyjson.com/products${searchQuery}?limit=${limit}&skip=${skip}`
      );

      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();

      // Сортируем локально, т.к. API не поддерживает sortBy
      const sortedProducts = [...data.products].sort((a, b) => {
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        } else if (sortBy === "price") {
          return a.price - b.price;
        }
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
}));
