import Image from "next/image";
import Legend from "./components/legend";
import { PulseEffect } from "./components/pulse-effect";
import ThemeToggle from "./components/theme-toggle";
import { inter } from "./components/fonts";

export default function Home() {
  return (
    <>
      <ThemeToggle />
      <PulseEffect />
      <Legend />

      <div id="main-content" className="flex flex-col items-center justify-center bg-primary min-h-screen px-4">
        <div className="max-w-xl w-full text-center select-none">
          <Image
            src="/img/profile.png"
            alt="Profile"
            width={182}
            height={182}
            className="rounded-full mx-auto mb-6"
          />
          <p className={`text-5xl text-primary mb-6 select-none ${inter.className}`}>
            <span className="text-secondary">Hello!</span> I'm Mobin.<br />
            <span className="text-3xl">Welcome to my website/portfolio &#128516;</span>
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/mobieto"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/img/github.svg" alt="GitHub" className="inline w-5 h-5 mr-1 mb-1" />
            </a>
            <a
              href="https://instagram.com/mobiouos"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/img/instagram.svg" alt="Instagram" className="inline w-5 h-5 mr-1 mb-1" />
            </a>
            <a
              href="https://linkedin.com/in/mobin-hosseini-a266122bb/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/img/linkedin.svg" alt="LinkedIn" className="inline w-5 h-5 mr-1 mb-1" />
            </a>
            <a
              href="mailto:hmobin2004@gmail.com"
            >
              <img src="/img/email.svg" alt="Email" className="inline w-5 h-5 mr-1 mb-1" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
