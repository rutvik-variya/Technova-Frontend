"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/hooks/auth/use-current-user";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "USER" | "ADMIN";
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { data, isLoading, isError } = useCurrentUser();
  const router = useRouter();

  const user = data?.data;

  useEffect(() => {
    if (isLoading) {
      return;
    }

    // Not authenticated
    if (isError || !user) {
      router.replace("/login");
      return;
    }

    // Authenticated but does not have required role
    if (requiredRole && user.role !== requiredRole) {
      router.replace("/");
    }
  }, [isLoading, isError, user, requiredRole, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  // Don't render protected content when authentication failed
  if (isError || !user) {
    return null;
  }

  // Don't render content when role is not allowed
  if (requiredRole && user.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
