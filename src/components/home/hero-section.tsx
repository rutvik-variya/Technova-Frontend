"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Smartphone,
  Laptop,
} from "lucide-react";
import Container from "../layout/container";
import Button from "../ui/button";
import { ROUTES } from "@/constants/routes";

const CAROUSEL_SLIDES = [
  {
    id: 1,
    tag: "Flagship Mobile",
    tagIcon: Sparkles,
    title: "Galaxy S26 Ultra Series.",
    description:
      "Experience cutting-edge AI capabilities and revolutionary camera systems in your pocket.",
    ctaText: "Explore Smartphones",
    ctaLink: `${ROUTES.PRODUCTS}?category=mobile-tablet`,
    accentColor: "from-cyan-600/20 to-blue-600/20",
  },
  {
    id: 2,
    tag: "Apple Ecosystem",
    tagIcon: Sparkles,
    title: "Seamless Power & Style.",
    description:
      "Connect your iPhone and MacBook effortlessly with industry-leading ecosystem features.",
    ctaText: "Explore Apple Gear",
    ctaLink: `${ROUTES.PRODUCTS}?brand=apple`,
  },
  {
    id: 3,
    tag: "New Arrival",
    tagIcon: Zap,
    title: "Ultra Precision Hardware.",
    description:
      "Elevate your tech setup with flagship laptops and modern smartphone technology.",
    ctaText: "Upgrade Setup",
    ctaLink: ROUTES.PRODUCTS,
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length,
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="bg-slate-50/50 py-6 lg:py-10">
      <Container>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Hero Carousel Slide (2 Cols) */}
          <div className="relative flex min-h-95 flex-col justify-between overflow-hidden rounded-3xl bg-slate-900 p-8 text-white sm:p-12 lg:col-span-2">
            {/* Slide Content */}
            {CAROUSEL_SLIDES.map((slide, index) => {
              const TagIcon = slide.tagIcon;
              if (index !== currentSlide) return null;

              return (
                <div
                  key={slide.id}
                  className="z-10 my-auto max-w-lg animate-in fade-in slide-in-from-right-4 duration-500"
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-600/20 px-3.5 py-1 text-xs font-semibold text-blue-400 backdrop-blur-md">
                    <TagIcon className="h-3.5 w-3.5 text-blue-400" />
                    <span>{slide.tag}</span>
                  </div>

                  <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
                    {slide.title}
                  </h1>

                  <p className="mt-4 text-sm text-slate-300 sm:text-base leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link href={slide.ctaLink}>
                      <Button className="gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500">
                        {slide.ctaText} <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}

            {/* Carousel Controls */}
            <div className="z-10 mt-8 flex items-center justify-between border-t border-slate-800/80 pt-6">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {CAROUSEL_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx
                        ? "w-8 bg-blue-500"
                        : "w-2 bg-slate-700 hover:bg-slate-600"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-800/80 text-slate-300 transition hover:bg-slate-700 hover:text-white"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-800/80 text-slate-300 transition hover:bg-slate-700 hover:text-white"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Background Glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
          </div>

          {/* Right Side Promo Banners (MacBook & iPhone) */}
          <div className="flex flex-col gap-6">
            {/* MacBook Banner */}
            <div className="group relative flex flex-1 flex-col justify-between rounded-3xl border border-slate-200 bg-linear-to-br from-slate-100 via-white to-slate-50 p-6 shadow-xs transition-all duration-300 hover:border-blue-300 hover:shadow-md">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                    MacBook Lineup
                  </span>
                  <Laptop className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="mt-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                  MacBook Air & Pro
                </h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Supercharged by Apple M-Series chips for extreme performance.
                </p>
              </div>
              <Link
                href={`${ROUTES.PRODUCTS}?search=macbook`}
                className="mt-6 inline-flex items-center text-xs font-bold text-blue-600 transition-all hover:gap-2"
              >
                <span>Explore MacBooks</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>

            {/* iPhone Banner */}
            <div className="group relative flex flex-1 flex-col justify-between rounded-3xl border border-slate-200 bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 p-6 text-white shadow-xs transition-all duration-300 hover:border-slate-700 hover:shadow-md">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                    Flagship Mobile
                  </span>
                  <Smartphone className="h-5 w-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <h3 className="mt-3 text-xl font-bold text-white transition-colors group-hover:text-blue-400">
                  iPhone 16 Pro Series
                </h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Titanium design, Apple Intelligence, and advanced camera
                  setup.
                </p>
              </div>
              <Link
                href={`${ROUTES.PRODUCTS}?search=iphone`}
                className="mt-6 inline-flex items-center text-xs font-bold text-blue-400 transition-all hover:gap-2"
              >
                <span>Shop iPhones</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
