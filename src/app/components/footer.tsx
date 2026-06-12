import Link from "next/link";
import { inter } from "./fonts";
import ThemeToggle from "./theme-toggle";

interface FooterLink {
    label: string;
    href: string;
    external?: boolean;
}

const footerLinks: FooterLink[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "CV", href: "/cv" },
];

const socialLinks: FooterLink[] = [
    { label: "GitHub", href: "https://github.com/mobiuous", external: true },
    { label: "Instagram", href: "https://instagram.com/mobiouos", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/mobin-hosseini-a266122bb/", external: true },
];

export default function Footer() {
    return (
        <footer className="mt-6">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.5fr_1fr_1fr] md:px-10 lg:px-12">
                <div className="space-y-3">
                    <p className={`text-lg font-semibold text-secondary ${inter.className}`}>
                        Mobin H.
                    </p>
                    <p className={`max-w-sm text-xs/snug text-primary ${inter.className}`}>
                        Contact me at any of my socials or e-mail at: mobinhdev@gmail.com
                    </p>
                </div>

                <div className="space-y-3">
                    <p className={`text-sm font-semibold uppercase tracking-[0.2em] text-secondary ${inter.className}`}>
                        Explore
                    </p>
                    <ul className="space-y-2">
                        {footerLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`text-sm text-primary hover:underline ${inter.className}`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-3">
                    <p className={`text-sm font-semibold uppercase tracking-[0.2em] text-secondary ${inter.className}`}>
                        Social
                    </p>
                    <ul className="space-y-2">
                        {socialLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-sm text-primary hover:underline ${inter.className}`}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 pb-8 md:flex-row md:items-end md:justify-between md:px-10 lg:px-12">
                <p className={`text-[0.625rem] text-primary ${inter.className}`}>
                    &copy; {new Date().getFullYear()} Mobin H. All rights reserved.
                </p>

                <div className="self-end md:self-auto">
                    <ThemeToggle />
                </div>
            </div>
        </footer>
    );
}