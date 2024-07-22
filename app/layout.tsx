"use client";

import "@/styles/globals.css";
import { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { SidebarProvider } from "@/providers/sidebar-provider";
import { AuthProvider } from "@/providers/auth-provider";

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
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={font.className}>
        <main className="h-full flex">
          <AuthProvider>
            <QueryProvider>
              <ThemeProvider>
                <SidebarProvider>
                  <Sidebar />
                  <div className="flex-1 flex flex-col h-full overflow-clip">
                    <Header />
                    <div className="flex-1 overflow-auto">{children}</div>
                  </div>
                </SidebarProvider>
              </ThemeProvider>
            </QueryProvider>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
