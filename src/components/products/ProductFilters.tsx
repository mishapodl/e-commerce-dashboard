"use client";

import { useProductStore } from "@/store/product";


export default function ProductFilters() {
  const { search, sortBy, setSearch, setSortBy } = useProductStore();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2"
      />

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as "title" | "price")}
        className="border border-gray-300 rounded px-3 py-2"
      >
        <option value="title">Sort by Title</option>
        <option value="price">Sort by Price</option>
      </select>
    </div>
  );
}
