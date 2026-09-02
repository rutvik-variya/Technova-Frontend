"use client";

import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import Container from "../layout/container";

const TRUST_FEATURES = [
  {
    icon: Truck,
    title: "Free Express Delivery",
    description: "For all orders over ₹1,999",
  },
  {
    icon: ShieldCheck,
    title: "1-Year Warranty",
    description: "100% Brand Guarantee",
  },
  {
    icon: RotateCcw,
    title: "7 Days Easy Return",
    description: "Hassle-free instant refunds",
  },
  {
    icon: Headphones,
    title: "24/7 Tech Support",
    description: "Dedicated expert assistance",
  },
];

export default function TrustSection() {
  return (
    <section className="border-y border-slate-100 bg-linear-to-b from-white via-slate-50/30 to-white py-8 lg:py-10">
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md hover:shadow-slate-200/50"
              >
                {/* Icon Container */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-blue-600/30">
                  <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Content */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 transition-colors duration-200 group-hover:text-blue-600">
                    {feature.title}
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
