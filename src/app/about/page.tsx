import BaseLayout from "../components/base-layout";
import DottedGridBackground from "../components/dotted-grid-background";
import { geistSans, inter } from "../components/fonts";
import TypewriterText from "../components/typewriter-text";

const aboutText = `> Hello! I'm Mobin, a computer science grad with a passion for building things. I'm currently pursuing a career in software engineering, with a particular interest in cloud systems.

> Over the years, I've worked on a bunch of stuff, from web applications to multiplayer game systems and cloud-native projects. I love learning new things, solving problems, and bringing ideas to life.

> Apart from coding, I also enjoy cooking, gym and gaming. Feel free to reach out if you have any questions, or just to chat :D`;

export default function About() {
  return (
    <BaseLayout> 
      <DottedGridBackground />

      <div className="relative flex flex-col items-center min-h-screen overflow-hidden pt-64">
        <div className="relative max-w-2xl w-full text-center z-20">
          <h1 className={`text-3xl font-bold text-primary ${inter.className}`}
              style={{ animation: "fade-in 1s ease-in-out" }}>
            About me
          </h1>
          <p className={`text-primary opacity-40 mb-8 text-xs ${inter.className}`}
             style={{ "--blurEndOpacity": 0.4, animation: "blur-in 2s ease-in-out" } as React.CSSProperties}>
            (Click anywhere to skip)
          </p>
          
          <div className="text-left"> 
            <TypewriterText
              text={aboutText}
              speed={52}
              className={`text-primary mb-4 whitespace-pre-line ${geistSans.className}`}
            />
          </div>
        </div>

        <div className="bottom-24 absolute left-1/2 -translate-x-1/2">
          <a
            href="/cv"
            className="pointer-events-auto px-5 py-2 text-md font-medium text-secondary hover:underline"
            style={{ animation: "blur-in 2s ease-in-out" }}
          >
            Check out my CV
          </a>
        </div>
      </div>
    </BaseLayout>
  );
}