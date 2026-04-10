import { Hero } from "@/components/home/hero";
import { TrustIndicators } from "@/components/home/trust-indicators";
import { CelebrityCarousel } from "@/components/home/celebrity-carousel";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { SmartBuying } from "@/components/home/smart-buying";
import { HowItWorks } from "@/components/home/how-it-works";
import { FinalCTA } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustIndicators />
      <CelebrityCarousel />
      <FeaturedCategories />
      <SmartBuying />
      <HowItWorks />
      <FinalCTA />
    </>
  );
}
