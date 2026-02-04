import React from 'react';
import { PulseEffect } from "./pulse-effect";
import ThemeToggle from "./theme-toggle";
import Navigation from "./navigation";
import { inter } from './fonts';

interface BaseLayoutProps {
    children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
    return (
        <div className="bg-primary overflow-hidden">
            <PulseEffect />

            <header>
                <ThemeToggle />
                <Navigation />
            </header>
            <main>
                {children}
            </main>
            <footer className="py-6 mt-12 border-t">
                <div className="mx-auto max-w-7xl">
                    <p className={`text-center text-sm text-secondary ${inter.className}`}>
                        &copy; {new Date().getFullYear()} Mobin H. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default BaseLayout;