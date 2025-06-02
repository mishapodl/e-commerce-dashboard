"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/Button";
import Pagination from "@/components/products/Pagination";
import { withAuth } from "@/components/withAuth";

import { useProductStore } from "@/store/product";

function ProductListClient() {
  const { products, fetchProducts, deleteProduct, loading, page } =
    useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [page, fetchProducts]);

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Products</h1>
        <Link href="/admin/products/new">
          <Button>Add Product</Button>
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-xl p-4 bg-white shadow-sm"
              >
                <h2 className="text-lg text-gray-600 font-semibold mb-2">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2 truncate">
                  {product.description}
                </p>
                <p className="text-blue-600 font-semibold mb-4">
                  ${product.price}
                </p>

                <div className="flex gap-2">
                  <Link href={`/admin/products/${product.id}/edit`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    color="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Pagination />
        </>
      )}
    </div>
  );
}

export default withAuth(ProductListClient);
