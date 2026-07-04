import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/components/NavBar"

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumora Search",
  icons: {
    icon: "/favicon.png"
  },
  description: "Find where movies and TV shows are streaming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-[#0B0F19] text-white`}
      >
      <NavBar />
      {children}
      </body>
    </html>
  );
}