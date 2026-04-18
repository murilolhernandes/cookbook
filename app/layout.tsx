import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from '@/components/footer';
import Header from '@/components/header';
// import { useEffect, useState } from 'react';
import { createServerSupabaseClient } from '@/utils/supabase/server';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Cookbook Project",
    default: "Cookbook Project"
  },
  description: "Family Recipe Website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createServerSupabaseClient();

  const { data: { session } } = await supabase.auth.getSession();
  
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body 
        className="min-h-full flex flex-col"
        suppressHydrationWarning
        >
          <Header session={session}/>

          <main className="flex-grow">
            {children}
          </main>
          
          <Footer />
      </body>
    </html>
  );
}
