import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ARTHO'S Humanitarian Society",
    template: "%s | ARTHO'S",
  },
  description:
    "ARTHO'S is a humanitarian society dedicated to making a positive impact through education, health, blood donation, book drives, and community service in Pakistan.",
  keywords: [
    "NGO Pakistan",
    "humanitarian society",
    "volunteer",
    "blood donation",
    "book donation",
    "ARTHO'S",
  ],
  authors: [{ name: "ARTHO'S Humanitarian Society" }],
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "ARTHO'S Humanitarian Society",
    title: "ARTHO'S Humanitarian Society",
    description:
      "Making a positive impact through education, health, and community service in Pakistan.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARTHO'S Humanitarian Society",
    description:
      "Making a positive impact through education, health, and community service in Pakistan.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="flex flex-col min-h-screen antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
