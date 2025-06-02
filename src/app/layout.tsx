import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./providers/AuthProvider";

export const metadata: Metadata = {
  title: "My E-commerce App",
  description: "Test K-Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
