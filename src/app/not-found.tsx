import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Page not found:... </h1>
      <p className="text-lg mb-6">404.</p>
      <Link
        href="/products"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
      >
        Back to products
      </Link>
    </div>
  );
}
