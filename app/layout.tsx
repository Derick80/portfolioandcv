import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/navigation-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Dr. Hoskinson's Blog",
  description: 'A personal web app for Dr. Hoskinson',
  keywords: [
      'clinical genetics',
      'genetics phd',
      'acmg',
      'variant classification',
      'somatic',
      'germline',
      'tufts genetics phd'
  ],
  robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
          index: true,
          follow: true
      }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} gap-20 max-w-7xl mx-auto not-[]:antialiased`}
      >
        <NavigationBar
        
        />
        {children}
      </body>
    </html>
  );
}
