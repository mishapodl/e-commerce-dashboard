"use client";

import { useProductStore } from "@/store/product";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const { products, loading } = useProductStore();

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
