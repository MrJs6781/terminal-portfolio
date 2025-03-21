// app/layout.tsx
import "@/app/globals.css";
import "../styles/fonts.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import profileData from "@/data/profile.json";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${profileData.name} | Terminal Portfolio`,
  description: `${profileData.name}'s portfolio website in terminal theme`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider initialLanguage="en">{children}</LanguageProvider>
      </body>
    </html>
  );
}
