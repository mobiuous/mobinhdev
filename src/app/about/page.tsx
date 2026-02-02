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
              Hello! Welcome to the about
            </p>
            
            <p className="text-primary mb-4">
              Hello! Welcome to the about Hello! Welcome to the about Hello! Welcome to the about Hello! Welcome to the about
            </p>
            
            <p className="text-primary">
              Hello! Welcome to the about Hello! Welcome to the about
            </p>
          </div>
        </div>
      </div>
    </>
  );
}