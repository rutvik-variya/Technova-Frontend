"use client";

import { useCategories } from "@/hooks/use-categories";
import Section from "../ui/section";
import Container from "../layout/container";
import Heading from "../ui/heading";
import CategoryCard from "./category-card";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function CategorySection() {
  const { data, isLoading, isError, refetch } = useCategories();
  const categories = data?.data || [];

  return (
    <Section className="bg-slate-50/50 py-10 lg:py-14">
      <Container>
        <Heading
          title="Browse by Category"
          description="Find devices, components, and tech gear quickly by browsing our categories."
        />

        {/* Skeleton Loading State */}
        {isLoading && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <div className="h-14 w-14 animate-pulse rounded-xl bg-slate-200" />
                  <div className="space-y-2">
                    <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                    <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>
                <div className="h-8 w-8 animate-pulse rounded-xl bg-slate-100" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/50 p-6 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <AlertCircle className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-bold text-slate-900">
              Unable to load categories
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Please check your connection and try again.
            </p>
            <button
              onClick={() => refetch()}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Try Again
            </button>
          </div>
        )}

        {/* Loaded Data State */}
        {!isLoading &&
          !isError &&
          (categories.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-xs text-slate-500">
              No categories found.
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ))}
      </Container>
    </Section>
  );
}
