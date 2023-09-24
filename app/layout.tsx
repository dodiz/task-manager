"use client";
import "@/styles/globals.css";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header, Sidebar } from "@/components";
import { QueryProvider } from "@/app/QueryProvider";

const ThemeProvider = dynamic(
  async () => {
    const { ThemeProvider } = await import("@/context");
    return ThemeProvider;
  },
  {
    ssr: false,
  }
);

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Task manager",
  description: "Task manager",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <QueryProvider>
        <body className={font.className}>
          <main className="min-h-full flex">
            <ThemeProvider>
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <div className="flex-1">{children}</div>
              </div>
            </ThemeProvider>
          </main>
        </body>
      </QueryProvider>
    </html>
  );
}
