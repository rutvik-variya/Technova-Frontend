"use client";

import { useCategories } from "@/hooks/use-categories";

export default function Home() {
  const { data, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading categories...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-red-600">
          Failed to load categories.
          {error instanceof Error ? ` ${error.message}` : ""}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">TechNova Categories</h1>

      <div className="mt-6 space-y-3">
        {data?.data?.map((category) => (
          <div key={category.id} className="rounded-lg border p-4">
            <h2 className="font-semibold">{category.name}</h2>

            <p className="text-sm text-gray-500">{category.slug}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
