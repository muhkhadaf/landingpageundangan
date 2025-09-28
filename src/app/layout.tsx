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
  title: "Nanda Invitation - Undangan Pernikahan Digital",
  description: "Nanda Invitation menyediakan undangan pernikahan digital elegan untuk momen spesial Anda. Desain custom sesuai tema impian.",
  keywords: "undangan pernikahan, wedding invitation, undangan digital, nanda invitation, pernikahan",
  authors: [{ name: "Nanda Invitation" }],
  openGraph: {
    title: "Nanda Invitation - Undangan Pernikahan Digital",
    description: "Desain undangan pernikahan digital custom elegan untuk momen spesial Anda bersama Nanda Invitation.",
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
