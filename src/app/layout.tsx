import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { ReactQueryProvider } from "@/lib/query-client";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Roni — Flow State, Mastered.",
  description: "The fluid productivity app that adapts to how you think.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[--surface-dim] text-[--on-surface]">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
