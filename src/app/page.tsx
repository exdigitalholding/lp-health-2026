import Benefits from "@/components/sections/benefits";
import CtaFinal from "@/components/sections/cta-final";
import Faq from "@/components/sections/faq";
import LpFooter from "@/components/sections/footer";
import Hero from "@/components/sections/hero";
import HowItWorks from "@/components/sections/how-it-works";
import LpNavbar from "@/components/sections/navbar";
import Plans from "@/components/sections/plans";
import ProblemContext from "@/components/sections/problem-context";
import Security from "@/components/sections/security";
import SocialProof from "@/components/sections/social-proof";
import StartForm from "@/components/sections/start-form";
import Testimonials from "@/components/sections/testimonials";
import WhatYouGet from "@/components/sections/what-you-get";

export default function LandingPage() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen w-full flex-col bg-white text-gray-900"
    >
      <LpNavbar />
      <Hero />
      <SocialProof />
      <ProblemContext />
      <HowItWorks />
      <WhatYouGet />
      <Benefits />
      <Testimonials />
      <Security />
      <Plans />
      <StartForm />
      <Faq />
      <CtaFinal />
      <LpFooter />
    </main>
  );
}
