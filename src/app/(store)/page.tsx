import Link from "next/link";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Star,
  Heart,
  ShoppingBag,
} from "lucide-react";

import Container from "@/components/layout/container";
import Section from "@/components/ui/section";
import Heading from "@/components/ui/heading";
import Button from "@/components/ui/button";
import CategorySection from "@/components/home/category-section";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-50 py-8 lg:py-12">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Main Hero Slide */}
            <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl bg-slate-900 p-8 text-white sm:p-12 lg:col-span-2">
              <div className="z-10 max-w-md">
                <span className="rounded-full bg-blue-600/30 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
                  Next-Gen Tech
                </span>
                <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                  Pro-Level Performance.
                </h1>
                <p className="mt-4 text-sm text-slate-300 sm:text-base">
                  Empower your work and play with newest M-Series MacBooks &
                  Flagship Android devices.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link href="/products">
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                      Shop Catalog <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              {/* Background Accent Decorative Circle */}
              <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
            </div>

            {/* Side Promo Banner Cards */}
            <div className="flex flex-col gap-6">
              <div className="relative flex-1 rounded-3xl bg-blue-50 p-6 border border-blue-100 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Hot Deal
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    Wireless Noise-Canceling Audio
                  </h3>
                  <p className="mt-1 text-xs text-slate-600">
                    Up to 40% OFF this week
                  </p>
                </div>
                <Link
                  href="/products"
                  className="mt-4 inline-flex items-center text-xs font-bold text-blue-600 hover:gap-2 transition-all"
                >
                  Browse Audio <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="relative flex-1 rounded-3xl bg-amber-50 p-6 border border-amber-100 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                    New Arrival
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    Smart Wearables
                  </h3>
                  <p className="mt-1 text-xs text-slate-600">
                    Track health with precision
                  </p>
                </div>
                <Link
                  href="/products"
                  className="mt-4 inline-flex items-center text-xs font-bold text-amber-700 hover:gap-2 transition-all"
                >
                  Explore Watches <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Badges Bar */}
      <div className="border-y border-gray-100 bg-white py-6">
        <Container>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Free Express Delivery
                </h4>
                <p className="text-xs text-slate-500">For orders over ₹1,999</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  1-Year Warranty
                </h4>
                <p className="text-xs text-slate-500">100% Brand Guarantee</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <RotateCcw className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  7 Days Easy Return
                </h4>
                <p className="text-xs text-slate-500">Hassle-free refunds</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Headphones className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  24/7 Tech Support
                </h4>
                <p className="text-xs text-slate-500">Dedicated assistance</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Shop By Category */}

      <CategorySection />

      {/* Featured Products Grid */}
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

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((id) => (
              <div
                key={id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Product Badge */}
                <div className="absolute left-3 top-3 z-10">
                  <span className="rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                    -15% OFF
                  </span>
                </div>

                {/* Wishlist Quick Action */}
                <button
                  className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 text-slate-600 backdrop-blur-sm transition hover:bg-white hover:text-red-500"
                  aria-label="Add to wishlist"
                >
                  <Heart className="h-4 w-4" />
                </button>

                {/* Product Image Placeholder */}
                <div className="relative aspect-square w-full bg-slate-100 flex items-center justify-center group-hover:scale-105 transition duration-300">
                  <span className="text-xs font-semibold text-slate-400">
                    Device Preview
                  </span>
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <span className="text-xs font-semibold text-slate-700">
                      4.8
                    </span>
                    <span className="text-xs text-slate-400">(42)</span>
                  </div>

                  <h3 className="mt-2 text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600">
                    TechNova Ultra Slim Pro Laptop
                  </h3>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 line-through">
                        ₹99,999
                      </span>
                      <p className="text-base font-extrabold text-slate-900">
                        ₹84,999
                      </p>
                    </div>

                    <button
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
