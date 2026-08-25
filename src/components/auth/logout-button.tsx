"use client";

import { useRouter } from "next/navigation";

import { useLogout } from "@/hooks/use-logout";

export default function LogoutButton() {
  const router = useRouter();

  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();

      router.push("/login");
    } catch {
      // Error handled by useLogout
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={logoutMutation.isPending}
      className="rounded-lg bg-red-600 px-4 py-2 text-white disabled:opacity-50"
    >
      {logoutMutation.isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
