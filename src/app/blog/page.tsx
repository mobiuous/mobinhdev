"use client";

import BaseLayout from "../components/base-layout";
import DottedGridBackground from "../components/dotted-grid-background";
import AboutIntro from "../components/about-intro";
import { inter } from "../components/fonts";

export default function About() {
  return (
    <BaseLayout> 
      <DottedGridBackground />

      <div className="relative flex flex-col items-center min-h-screen overflow-hidden pt-64">
        <p> Blog </p>
      </div>
    </BaseLayout>
  );
}