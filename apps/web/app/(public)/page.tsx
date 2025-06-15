import { CTA } from "@/app/(public)/_components/CTA";
import { Features } from "@/app/(public)/_components/Features";
import { Hero } from "@/app/(public)/_components/Hero";
import { HowItWorks } from "@/app/(public)/_components/HowItWorks";
import { LatestBinsSection } from "@/app/(public)/_components/LatestBins";



export default function LandingPage() {

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
