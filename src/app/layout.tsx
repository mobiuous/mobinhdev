import type { Metadata } from "next";
import "./globals.css";
import { ReactLenis } from "lenis/react"
import { ThemeProvider } from "./components/theme-context";

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
      <body>
        <ThemeProvider>
          <ReactLenis root>
            {children}
          </ReactLenis>
        </ThemeProvider>
      </body>
    </html>
  );
}
