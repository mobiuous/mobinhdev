"use client";

import { useState } from "react";
import { geistSans } from "./fonts";
import TypewriterText from "./typewriter-text";

const aboutText = `> Hello! I'm Mobin, a computer science grad with a passion for building things. I'm currently pursuing a career in software engineering, with a particular interest in cloud systems.

> Over the years, I've worked on a bunch of stuff, from web applications to multiplayer game systems and cloud-native projects. I love learning new things, solving problems, and bringing ideas to life.

> Apart from coding, I also enjoy cooking, gym and gaming. Feel free to reach out if you have any questions, or just to chat :D`;

export default function AboutIntro() {
  const [_, setShowSkipHint] = useState(true);

  return (
    <div className="relative z-20 w-full max-w-2xl px-4 text-center sm:px-0">
      <h1
        className={`text-3xl font-light uppercase tracking-[0.2em] text-secondary`}
        style={{ animation: "fade-in 1s ease-in-out" }}
      >
        About me
      </h1>

      <div className="text-left mt-12">
        <TypewriterText
          text={aboutText}
          speed={52}
          onComplete={() => setShowSkipHint(false)}
          className={`text-primary font-light mb-4 whitespace-pre-line ${geistSans.className}`}
        />
      </div>
    </div>
  );
}