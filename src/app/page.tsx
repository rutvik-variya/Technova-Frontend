import Link from "next/link";

import Container from "@/components/layout/container";
import Section from "@/components/ui/section";
import Heading from "@/components/ui/heading";
import Button from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-50">
        <Container>
          <div className="grid min-h-130 items-center gap-10 py-16 lg:grid-cols-2 lg:py-20">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
                New Collection
              </p>

              <h1 className="max-w-xl text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                Upgrade Your
                <span className="block text-blue-600">Digital Life</span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
                Discover the latest laptops, smartphones, tablets and
                accessories at TechNova.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/products">
                  <Button>Shop Now</Button>
                </Link>

                <Link href="/products">
                  <Button variant="outline">Explore Products</Button>
                </Link>
              </div>
            </div>

            <div className="flex min-h-75 items-center justify-center rounded-2xl bg-gray-200 sm:min-h-100">
              <span className="text-sm text-gray-500">Hero Product Image</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <Section>
        <Container>
          <Heading
            title="Shop by Category"
            description="Find the right technology for your everyday needs."
          />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {["Laptop & PC", "Mobile & Tablets", "Accessories", "Gaming"].map(
              (category) => (
                <Link
                  key={category}
                  href="/products"
                  className="rounded-xl border border-gray-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-md"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-xs text-gray-500">
                    Image
                  </div>

                  <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                    {category}
                  </h3>
                </Link>
              ),
            )}
          </div>
        </Container>
      </Section>

      {/* Featured */}
      <Section className="bg-gray-50">
        <Container>
          <Heading
            title="Featured Products"
            description="Explore our most popular technology products."
          />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((product) => (
              <div
                key={product}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                <div className="aspect-square bg-gray-100" />

                <div className="p-4">
                  <p className="text-xs text-gray-500">TechNova</p>

                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-gray-900">
                    Premium Technology Product
                  </h3>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold text-gray-900">₹89,999</span>

                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      <Section>
        <Container>
          <div className="rounded-2xl bg-gray-900 px-6 py-12 text-center sm:px-10 lg:px-16">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Don&apos;t Miss Our Latest Deals
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
              Get updates about new products, offers and exclusive discounts.
            </p>

            <div className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
              />

              <Button>Subscribe</Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
