"use client";

import BaseLayout from "../components/base-layout";
import DottedGridBackground from "../components/dotted-grid-background";
import AboutIntro from "../components/about-intro";
import { inter } from "../components/fonts";

export default function About() {
  return (
    <BaseLayout> 
      <DottedGridBackground />

      <div className="relative flex min-h-screen flex-col items-center overflow-hidden px-4 pb-12 pt-36 sm:px-6 sm:pt-58">
        <AboutIntro />

        <div className="mt-12 sm:mt-16">
          <a
            href="/cv"
            className={`cta-gradient mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(201, 86, 66, 0.28)] transition-all duration-150 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_18px_36px_rgba(201, 86, 66, 0.38)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb347]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${inter.className}`}
            style={{ animation: "fade-in 1s ease-in-out" }}
          >
            Check out my CV
          </a>
        </div>
      </div>
    </BaseLayout>
  );
}