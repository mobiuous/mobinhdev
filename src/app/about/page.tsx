import Link from "next/link";
import Navigation from "../components/navigation";
import ThemeToggle from "../components/theme-toggle";
import { PulseEffect } from "../components/pulse-effect";

export default function About() {
  return (
    <>
      <ThemeToggle />
      <PulseEffect />
      <Navigation />

      <div className="flex flex-col items-center justify-center bg-primary min-h-screen px-4">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold text-primary mb-8">About Me</h1>
          
          <div className="bg-secondary rounded-lg p-8 shadow-lg border-themed text-left">
            <p className="text-primary mb-4">
              Hello! I'm Mobin, a computer science graduate with a passion for cloud systems and AI.
            </p>
            
            <p className="text-primary mb-4">
              I enjoy creating interactive web experiences and working with cutting-edge technologies.
              This website showcases some of my work and interests.
            </p>
            
            <p className="text-primary">
              Feel free to explore and get in touch if you'd like to connect!
            </p>
          </div>

          <div className="mt-8">
            <Link 
              href="/"
              className="text-secondary hover:text-primary transition-colors underline"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}