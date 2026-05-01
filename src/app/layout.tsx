import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import { ComparisonProvider } from "@/context/ComparisonContext";
import ComparisonTray from "@/components/dashboard/comparison/Tray";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoCompare | Professional Car Comparison Dashboard",
  description:
    "Compare the latest car models, specs, and prices with our high-performance dashboard.",
  keywords: [
    "car comparison",
    "automotive specs",
    "EV comparison",
    "car dashboard",
  ],
  openGraph: {
    title: "AutoCompare Dashboard",
    description: "Side-by-side car comparisons made easy.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AutoCompare Dashboard Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <ComparisonProvider>
          <main className="flex-1">{children}</main>
          <ComparisonTray />
        </ComparisonProvider>
      </body>
    </html>
  );
}
