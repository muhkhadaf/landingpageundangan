import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AOSProvider from "@/components/AOSProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eternal Bliss - Wedding Vendor Terpercaya | Undangan & Hantaran Pernikahan",
  description: "Wedding vendor terpercaya dengan layanan undangan dan hantaran pernikahan berkualitas premium. Wujudkan pernikahan impian Anda bersama Eternal Bliss.",
  keywords: "wedding vendor, undangan pernikahan, hantaran pernikahan, wedding invitation, wedding gift, pernikahan, nikah",
  authors: [{ name: "Eternal Bliss Wedding Vendor" }],
  openGraph: {
    title: "Eternal Bliss - Wedding Vendor Terpercaya",
    description: "Layanan undangan dan hantaran pernikahan berkualitas premium untuk mewujudkan hari bahagia Anda.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AOSProvider>
          {children}
        </AOSProvider>
      </body>
    </html>
  );
}
