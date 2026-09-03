import CategorySection from "@/components/home/category-section";
import TrustSection from "@/components/home/trust-section";
import HeroSection from "@/components/home/hero-section";
import FeaturedProduct from "@/components/home/featured-product";
import PromoSection from "@/components/home/promo-section";
import CtaSection from "@/components/home/cta-section";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Badges Bar */}
      <TrustSection />

      {/* promo section */}
      <PromoSection />

      {/* Shop By Category */}
      <CategorySection />

      {/* Featured Products Grid */}
      <FeaturedProduct />

      {/* cta section */}
      <CtaSection />
    </div>
  );
}
