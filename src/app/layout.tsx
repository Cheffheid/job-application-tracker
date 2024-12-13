import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import TopNav from "./_components/topnav";
import Sidebar from "./_components/sidebar";

import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "My Job Application Tracker",
  description: "Generated by create-t3-app for funsies.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <SessionProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar></Sidebar>
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <TopNav></TopNav>
              <main className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-slate-100">
                {children}
              </main>
              <Toaster />
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
