"use client";

import { useFeaturedProducts } from "@/hooks/use-featured-products";
import Section from "../ui/section";
import Container from "../layout/container";
import Heading from "../ui/heading";
import { Link } from "lucide-react";
import { ProductCard } from "./product-card";

export default function FeaturedProduct() {
  const { data, isLoading, isError } = useFeaturedProducts();
  const featuredProducts = data?.data || [];

  return (
    <Section className="bg-slate-50">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <Heading
            title="Featured Best-Sellers"
            description="Top rated devices loved by our customers."
            className="mb-0"
          />
          <Link
            href="/products"
            className="text-sm font-bold text-blue-600 hover:underline"
          >
            View All Products &rarr;
          </Link>
        </div>

        {!isLoading &&
          !isError &&
          (featuredProducts.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-xs text-slate-500">
              No featured products found.
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ))}
      </Container>
    </Section>
  );
}
