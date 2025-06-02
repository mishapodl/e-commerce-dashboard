"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { API_BASE_URL } from "@/api/config";

import { useProductStore, Product } from "@/store/product";
import {
  ProductForm,
  ProductFormData,
} from "@/components/products/ProductForm";
import { withAuth } from "@/components/withAuth";

function ProductEditClient() {
  const params = useParams();
  const router = useRouter();
  const loading = useProductStore((state) => state.loading);
  const updateProduct = useProductStore((state) => state.updateProduct);

  const [initialData, setInitialData] = useState<ProductFormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${API_BASE_URL}/products/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data: Product = await res.json();
        setInitialData({
          title: data.title,
          description: data.description,
          price: data.price,
          thumbnail: data.thumbnail,
        });
      } catch {
        setError("Failed to load product");
      }
    }
    fetchProduct();
  }, [params.id]);

  async function onSubmit(data: ProductFormData) {
    try {
      await updateProduct(params.id, { ...data, price: Number(data.price) });
      router.push("/admin/products");
    } catch {
      alert("Failed to update product");
    }
  }

  if (error) return <div className="text-red-600">{error}</div>;
  if (!initialData) return <div>Loading...</div>;

  return (
    <ProductForm
      initialData={initialData}
      loading={loading}
      onSubmit={onSubmit}
    />
  );
}

export default withAuth(ProductEditClient);
