"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data, isLoading, isError } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (isError || !data?.data)) {
      router.replace("/login");
    }
  }, [isLoading, isError, data, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return null;
  }

  return <>{children}</>;
}
