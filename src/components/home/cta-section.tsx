"use client";

import Link from "next/link";
import { ArrowRight, Laptop, Sparkles } from "lucide-react";
import Section from "../ui/section";
import Container from "../layout/container";
import { ROUTES } from "@/constants/routes";

export default function CtaSection() {
  return (
    <Section className="pb-16 lg:pb-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 px-6 py-16 text-center shadow-2xl shadow-slate-900/10 sm:px-12 lg:px-16 lg:py-20 border border-slate-800">
          {/* Ambient Lighting Accents */}
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-64 w-96 rounded-full bg-blue-600/15 blur-3xl" />
          <div className="pointer-events-none absolute right-10 bottom-0 h-48 w-48 rounded-full bg-blue-500/10 blur-2xl" />

          {/* Card Content */}
          <div className="relative z-10 mx-auto max-w-2xl">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-800/80 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400 backdrop-blur-xs">
              <Sparkles className="h-3 w-3 text-blue-400" />
              <span>Next-Gen Tech Awaits</span>
            </div>

            {/* Title */}
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to find your next device?
            </h2>

            {/* Subtitle */}
            <p className="mt-4 text-sm font-normal text-slate-300 sm:text-base leading-relaxed">
              Browse our complete collection and find technology that works for
              you.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={ROUTES.PRODUCTS}
                className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:bg-blue-500 hover:shadow-blue-600/40 hover:-translate-y-0.5"
              >
                <span>Start Shopping</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href={ROUTES.PRODUCTS}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-800/50 px-6 py-3.5 text-xs font-semibold text-slate-200 transition-all duration-200 hover:bg-slate-800 hover:text-white"
              >
                <Laptop className="h-4 w-4 text-slate-600" />
                <span className="text-slate-400">Explore Catalog</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
