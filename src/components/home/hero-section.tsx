import { ArrowRight, Link } from "lucide-react";
import Container from "../layout/container";
import Button from "../ui/button";

export default function HeroSection() {
  return (
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
  );
}
