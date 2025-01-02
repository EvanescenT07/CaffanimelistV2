import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/theme/providers";
import Navbar from "@/components/navbar/navbar-master";
import { Toaster } from "react-hot-toast";

const JetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata: Metadata = {
  title: "CaffanimelistV2",
  description:
    "CaffAnimeList is your ultimate destination to discover and explore popular anime lists. Powered by up-to-date data from MyAnimeList, find recommendations, the latest trends, and everything you need to choose your next anime to watch. Whether you're a hardcore fan or just starting out, CaffAnimeList makes it easy to find the best content.",
  icons: {
    icon: "/icon.png",
    href: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${JetBrainsMono.variable} relative min-h-screen scroll bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text`}
      >
        <Providers>
          <Toaster />
          <main>
            <Navbar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
