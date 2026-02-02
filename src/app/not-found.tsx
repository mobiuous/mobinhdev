"use client";

import ThemeToggle from "./components/theme-toggle";
import Navigation from "./components/navigation";
import { PulseEffect } from "./components/pulse-effect";
import { inter } from "./components/fonts";
import DottedGridBackground from "./components/dotted-grid-background";
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    return (
        <>
            <ThemeToggle />
            <PulseEffect />
            <Navigation />

            <div className={`flex flex-col items-center justify-center bg-primary min-h-screen px-4 ${inter.className}`}>
                <div className="max-w-2xl w-full text-center z-10">
                    <h1 className="text-3xl font-bold text-primary mb-8">Sorry, that page doesn't exist</h1>
                    <button className={`text-lg bg-accent hover:bg-[#a14939] text-white px-5 py-2 rounded-xl cursor-pointer transition-colors duration-200 ${inter.className}`} 
                            onClick={() => router.back()}
                            type="button"
                    >
                        Go back
                    </button>
                </div>
            </div>

            <DottedGridBackground />
        </>
    );
}