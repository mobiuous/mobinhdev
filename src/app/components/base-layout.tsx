import React from 'react';
import { PulseEffect } from "./pulse-effect";
import ThemeToggle from "./theme-toggle";
import Navigation from "./navigation";
import Footer from "./footer";
import { inter } from './fonts';

interface BaseLayoutProps {
    children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
    return (
        <div className="bg-primary overflow-hidden">
            <PulseEffect />

            <header>
                <Navigation />
            </header>
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default BaseLayout;