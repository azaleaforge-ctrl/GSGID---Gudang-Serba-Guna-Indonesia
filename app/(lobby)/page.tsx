"use client";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Header, BottomNav } from "@/components/lobby/Header";
import { Hero } from "@/components/lobby/Hero";
import { Marquee } from "@/components/lobby/Marquee";
import { Stats } from "@/components/lobby/Stats";
import { LorongCards } from "@/components/lobby/LorongCards";
import { Features } from "@/components/lobby/Features";
import { FAQ } from "@/components/lobby/FAQ";
import { CTA } from "@/components/lobby/CTA";
import { Footer } from "@/components/lobby/Footer";
import { DonateButton } from "@/components/shared/DonateButton";

export default function LobbyPage() {
  const { isMobile } = useIsMobile();

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <main className="flex-1 pb-6 md:pb-0">
        <Hero />
        <Marquee />
        <Stats />
        <LorongCards />
        <Features />
        <FAQ />
        <CTA />
      </main>
      <Footer />

      {/* Floating donate - desktop only per spec, mobile uses header */}
      {!isMobile && <DonateButton variant="floating" />}

      {/* Bottom nav - mobile distinct UI */}
      {isMobile && <BottomNav />}

      {/* spacer for bottom nav */}
      {isMobile && <div className="h-[64px] md:hidden shrink-0" aria-hidden />}
    </div>
  );
}
