"use client";

import { useCategories } from "@/hooks/use-categories";
import Section from "../ui/section";
import Container from "../layout/container";
import CategoryCard from "./category-card";

export default function CategorySection() {
  const { data, isLoading, isError } = useCategories();

  if (isLoading) {
    return (
      <section id="categories" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-52 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section id="categories" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <p className="text-red-600">Unable to load categories.</p>
      </section>
    );
  }
  const categories = data?.data || [];

  return (
    <>
      <Section>
        <Container>
          {categories.length === 0 ? (
            <p className="mt-8 text-gray-500">No categories available.</p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <CategoryCard category={categories} />
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
