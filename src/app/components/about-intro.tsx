"use client";

import { useState } from "react";
import { geistSans, inter } from "./fonts";
import TypewriterText from "./typewriter-text";

const aboutText = `> Hello! I'm Mobin, a computer science grad with a passion for building things. I'm currently pursuing a career in software engineering, with a particular interest in cloud systems.

> Over the years, I've worked on a bunch of stuff, from web applications to multiplayer game systems and cloud-native projects. I love learning new things, solving problems, and bringing ideas to life.

> Apart from coding, I also enjoy cooking, gym and gaming. Feel free to reach out if you have any questions, or just to chat :D`;

export default function AboutIntro() {
  const [showSkipHint, setShowSkipHint] = useState(true);

  return (
    <div className="relative z-20 w-full max-w-2xl px-4 text-center sm:px-0">
      <h1
        className={`text-3xl font-bold text-primary ${inter.className}`}
        style={{ animation: "fade-in 1s ease-in-out" }}
      >
        About me
      </h1>
      <p
        className={`text-primary mb-8 text-xs transition-opacity duration-500 ease-out ${inter.className} ${
          showSkipHint ? "opacity-40" : "opacity-0"
        }`}
        style={{ "--blurEndOpacity": 0.4, animation: "blur-in 2s ease-in-out" } as React.CSSProperties}
      >
        (Click anywhere to skip)
      </p>

      <div className="text-left">
        <TypewriterText
          text={aboutText}
          speed={52}
          onComplete={() => setShowSkipHint(false)}
          className={`text-primary mb-4 whitespace-pre-line ${geistSans.className}`}
        />
      </div>
    </div>
  );
}