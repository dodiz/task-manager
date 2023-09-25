"use client";

import "@/styles/globals.css";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Task Manager</title>
      </head>
      <body className={font.className}>
        <main className="h-full flex">
          <QueryProvider>
            <ThemeProvider>
              <Sidebar />
              <div className="flex-1 flex flex-col h-full overflow-clip">
                <Header />
                <div className="flex-1 overflow-auto">{children}</div>
              </div>
            </ThemeProvider>
          </QueryProvider>
        </main>
      </body>
    </html>
  );
}
