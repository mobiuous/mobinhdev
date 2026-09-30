import Image from "next/image";
import Legend from "./components/legend";
import DottedGridBackground from "./components/dotted-grid-background";
import { inter } from "./components/fonts";
import BaseLayout from "./components/base-layout";

export default function Home() {
  return (
    <BaseLayout>
      <Legend />

      <div id="main-content" className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
        <DottedGridBackground />
        <div className="max-w-xl w-full text-center z-10">
          <Image
            src="/img/profile.png"
            alt="Profile Picture"
            width={152}
            height={152}
            className="h-28 w-28 rounded-full mx-auto mb-6 mt-12 select-none sm:h-[182px] sm:w-[182px]"
          />
          <p className={`text-3xl text-primary mb-6 sm:text-5xl ${inter.className}`}>
            <span className="text-secondary">Greetings!</span><br />
            <span className="text-lg sm:text-2xl">Welcome to my website</span>
          </p>
          <div className="flex justify-center gap-8">
            <a
              href="https://github.com/mobiuous"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/img/github.svg" alt="GitHub Profile Link" width={5} height={5} className="inline w-5 h-5 mr-1 mb-1 transition-all duration-200 hover:scale-120" />
            </a>
            <a
              href="https://instagram.com/mobiuous"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/img/instagram.svg" alt="Instagram Profile Link" width={5} height={5} className="inline w-5 h-5 mr-1 mb-1 transition-all duration-200 hover:scale-120" />
            </a>
            <a
              href="https://linkedin.com/in/mobin-hosseini-a266122bb/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/img/linkedin.svg" alt="LinkedIn Profile Link" width={5} height={5} className="inline w-5 h-5 mr-1 mb-1 transition-all duration-200 hover:scale-120" />
            </a>
          </div>

          <a
            href="/contact"
            className={`cta-gradient mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(201, 86, 66, 0.28)] transition-all duration-150 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_18px_36px_rgba(201, 86, 66, 0.38)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb347]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${inter.className}`}
          >
            Get in touch
          </a>
        </div>
      </div>
    </BaseLayout>
  );
}
