"use client";

import { useProductStore } from "@/store/product";

export default function Pagination() {
  const { page, total, setPage } = useProductStore();
  const pages = Math.ceil(total / 12);

  if (pages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: pages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 border rounded ${
            page === i + 1 ? "bg-blue-600 text-white" : "bg-white text-blue-600"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
