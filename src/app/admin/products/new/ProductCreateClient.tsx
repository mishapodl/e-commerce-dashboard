"use client";

import { useRouter } from "next/navigation";

import { useProductStore } from "@/store/product";
import {
  ProductForm,
  ProductFormData,
} from "@/components/products/ProductForm";
import { withAuth } from "@/components/withAuth";

function ProductCreateClient() {
  const router = useRouter();
  const createProduct = useProductStore((state) => state.createProduct);
  const loading = useProductStore((state) => state.loading);

  async function onSubmit(data: ProductFormData) {
    try {
      const payload = {
        ...data,
        price: Number(data.price),
      };
      await createProduct(payload);
      router.push("/admin/products");
    } catch {
      alert("Failed to create product");
    }
  }

  return <ProductForm loading={loading} onSubmit={onSubmit} />;
}

export default withAuth(ProductCreateClient);
