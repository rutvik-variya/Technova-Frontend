"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import Section from "../ui/section";
import Container from "../layout/container";
import { ROUTES } from "@/constants/routes";

export default function PromoSection() {
  return (
    <Section className="py-12 lg:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-12 shadow-xl shadow-slate-900/10 sm:px-12 lg:px-16 lg:py-20">
          {/* Decorative Glow Elements */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

          {/* Section Content */}
          <div className="relative z-10 max-w-2xl">
            {/* Kicker Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-800/80 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400 backdrop-blur-xs">
              <Zap className="h-3 w-3 text-blue-400" />
              <span>TechNova Exclusive Deals</span>
            </div>

            {/* Main Headline */}
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Upgrade your tech stack today.
            </h2>

            {/* Description */}
            <p className="mt-4 text-sm font-normal text-slate-300 sm:text-base leading-relaxed">
              Discover powerful laptops, next-gen mobile devices, and
              high-performance hardware engineered for your workflow.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={ROUTES.PRODUCTS}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:bg-blue-500 hover:shadow-blue-600/40 hover:-translate-y-0.5"
              >
                <span>Explore Products</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-400 px-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Limited time seasonal offers available</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
