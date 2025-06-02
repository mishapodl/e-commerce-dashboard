"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AuthenticatedComponent(props: P) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    }, [isAuthenticated, router]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
          <p>Loading...</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}
