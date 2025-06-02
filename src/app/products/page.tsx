"use client";

import { useEffect } from "react";

import { useProductStore } from "@/store/product";

import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import Pagination from "@/components/products/Pagination";
import { withAuth } from "@/components/withAuth";

function ProductsPage() {
  const { fetchProducts, search, sortBy, page } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [search, sortBy, page, fetchProducts]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <ProductFilters />
      <ProductGrid />
      <Pagination />
    </div>
  );
}

export default withAuth(ProductsPage);
