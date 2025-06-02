"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useProductStore, Product } from "@/store/product";

type Props = {
  id: string;
};

export default function ProductDetailsPage({ id }: Props) {
  const fetchProductById = useProductStore((state) => state.fetchProductById);
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProductById(Number(id)).then((product) => {
      if (!product) {
        router.replace("/not-found");
      } else {
        setProduct(product);
      }
    });
  }, [id, fetchProductById, router]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover rounded-xl"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg text-blue-600 font-semibold mb-2">
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
}
