"use client";

import BaseLayout from "../components/base-layout";
import DottedGridBackground from "../components/dotted-grid-background";
import AboutIntro from "../components/about-intro";
import { inter } from "../components/fonts";

export default function About() {
  return (
    <BaseLayout> 
      <DottedGridBackground />

      <div className="relative flex min-h-screen flex-col items-center overflow-hidden px-4 pb-24 pt-40 sm:px-6 sm:pt-64">
        <AboutIntro />

        <div className="mt-12 sm:mt-16">
          <button className={`text-sm bg-accent text-white font-bold px-4 py-2 rounded-2xl cursor-pointer hover:bg-[#a14939] transition-colors duration-100 ${inter.className}`} 
            onClick={() => { location.href='/cv' }}
            type="button"
            style={{ animation: "fade-in 1s ease-in-out" }}
          >
            Check out my CV
          </button>
        </div>
      </div>
    </BaseLayout>
  );
}