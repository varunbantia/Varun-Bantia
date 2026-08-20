import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap" 
});

export const metadata: Metadata = {
  title: "Varun Banthia | Full Stack Developer",
  description: "I build digital products that feel as good as they work. React Native, Android, React, Node.js and Firebase.",
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-[#050505] text-white overflow-x-hidden`}>
        <div className="noise" />
        <main className="relative z-10 flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
