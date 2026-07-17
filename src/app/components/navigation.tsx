"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "./theme-context";
import { geistSans } from "./fonts";

interface NavItem {
    label: string;
    href: string;
}

interface NavigationProps {
    items?: NavItem[];
}

const defaultNavItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
];

export default function Navigation({ items = defaultNavItems }: NavigationProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const SCROLL_THRESHOLD = 300;
    
    setIsVisible(window.scrollY > SCROLL_THRESHOLD || pathname !== "/");
    
    const handleScroll = () => {
        setIsVisible(window.scrollY > SCROLL_THRESHOLD || pathname !== "/");
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
        <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`fixed top-2 left-2 z-60 md:hidden p-3 transition-all duration-300
                        ${theme === 'light' ? "text-black" : "text-white"}`}
            aria-label="Toggle mobile menu"
        >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMobileMenuOpen ? (
                    <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                    <path d="M3 12h18M3 6h18M3 18h18" />
                )}
            </svg>
        </button>

        {/* Mobile navbar */}
        <div className={`fixed top-0 left-0 h-full w-64 shadow-xl z-40 transition-transform duration-300 ease-in-out md:hidden
                        slight-accent backdrop-blur-md ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-col space-y-4 pt-20 px-6">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-2 text-lg border-b transition-colors duration-200 ${geistSans.className}
                                    ${theme === 'light' ? "border-black/50" : "border-white/50"} ${
                                        pathname === item.href
                                        ? "text-blue-600 font-semibold"
                                        : theme === 'light' ? "text-gray-800 hover:text-blue-600" : "text-gray-200 hover:text-blue-400"}`}
                    >
                            {item.label}
                    </Link>
                ))}
            </div>
        </div>
      
        {/* Desktop navbar */}
        <nav className={`fixed top-4 z-190 w-full transition-transform duration-800 ease-in-out hidden md:block ${
            isVisible ? 'translate-y-0' : '-translate-y-20'}`}>
            <div className={`flex items-center justify-center space-x-10 mx-auto max-w-4xl h-14 rounded-xl shadow-lg
                            slight-accent`}>
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`text-primary text-md underline-offset-3 ${geistSans.className} ${
                        pathname === item.href
                            ? "font-bold"
                            : "hover:underline"
                        }`} 
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </nav>
    </>
  );
}