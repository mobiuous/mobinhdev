import type { Metadata } from "next";
import "./globals.css";
import { ReactLenis } from "@/lib/lenis"
import { ThemeProvider } from "./components/theme-context";
import { geistSans , geistMono } from "./components/fonts";

export const metadata: Metadata = {
  title: "Mobin H",
  description: "Computer science graduate and web developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ReactLenis root>
            {children}
          </ReactLenis>
        </ThemeProvider>
      </body>
    </html>
  );
}
