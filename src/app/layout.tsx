import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Remotely ©",
    template: "%s | Remotely ©",
  },
  description: "Find a Job, Post a Job, Get a Job",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <Navbar />
      <body className={`${inter.className} min-w-[350px]`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
