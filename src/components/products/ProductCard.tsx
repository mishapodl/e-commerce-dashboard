"use client";

import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block border rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition"
    >
      <div className="relative w-full h-40 mb-4 rounded overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </div>
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p className="text-gray-500 text-sm">{product.description}</p>
      <p className="text-blue-600 font-semibold mt-2">${product.price}</p>
    </Link>
  );
}
