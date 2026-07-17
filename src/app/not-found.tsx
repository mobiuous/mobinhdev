"use client";

import { inter } from "./components/fonts";
import DottedGridBackground from "./components/dotted-grid-background";
import { useRouter } from 'next/navigation';
import BaseLayout from "./components/base-layout";

export default function NotFound() {
    const router = useRouter();

    return (
        <BaseLayout>
            <DottedGridBackground />
            <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
                <div className={`max-w-2xl w-full text-center z-10 ${inter.className}`}>
                    <h1 className="text-3xl font-bold text-primary mb-8">Sorry, that page doesn't exist</h1>
                    <button className={`text-lg bg-accent text-white px-5 py-2 rounded-xl cursor-pointer hover:bg-[#a14939] transition-colors duration-200 ${inter.className}`} 
                            onClick={() => router.back()}
                            type="button"
                    >
                        Go back
                    </button>
                </div>
            </div>
        </BaseLayout>
    );
}