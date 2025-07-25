"use client";

import {
  NavigationHeader,
  HeroSection,
  BenefitsSection,
  MarketplaceSection,
  AISection,
  HowItWorksSection,
  FAQSection,
  FinalCTASection,
  Footer,
} from "./components/LandingComponents";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--app-background)] text-[var(--app-foreground)]">
      <NavigationHeader />
      
      <main>
        <HeroSection />
        <BenefitsSection />
        <MarketplaceSection />
        <AISection />
        <HowItWorksSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      
      <Footer />
    </div>
  );
}