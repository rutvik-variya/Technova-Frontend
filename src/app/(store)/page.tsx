import Link from "next/link";
import { Star, Heart, ShoppingBag } from "lucide-react";

import Container from "@/components/layout/container";
import Section from "@/components/ui/section";
import Heading from "@/components/ui/heading";
import CategorySection from "@/components/home/category-section";
import TrustSection from "@/components/home/trust-section";
import HeroSection from "@/components/home/hero-section";
import FeaturedProduct from "@/components/home/featured-product";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Badges Bar */}
      <TrustSection />

      {/* Shop By Category */}
      <CategorySection />

      {/* Featured Products Grid */}
      <FeaturedProduct />
    </div>
  );
}
