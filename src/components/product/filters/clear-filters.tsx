"use client";

import { useRouter } from "next/navigation";

export default function ClearFilters() {
  const router = useRouter();

  const handleClear = () => {
    router.push("/products");
  };

  return (
    <button
      type="button"
      onClick={handleClear}
      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
    >
      Reset
    </button>
  );
}
