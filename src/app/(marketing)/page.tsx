

import { CTA } from "@/app/(marketing)/_components/CTA";
import { Features } from "@/app/(marketing)/_components/Features";
import { Hero } from "@/app/(marketing)/_components/Hero";
import { HowItWorks } from "@/app/(marketing)/_components/HowItWorks";
import { LatestBinsSection } from "@/app/(marketing)/_components/LatestBins";

export default function Home() {

  return (
    <>
      <Hero />
      <LatestBinsSection />
      <HowItWorks />
      <Features />
      <CTA />

    </>
  );
}
