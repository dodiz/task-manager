import "./globals.css";
import { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { ThemeProvider } from "@/app/theme-provider";
import { SidebarProvider } from "@/app/sidebar-provider";
import { cookies } from "next/headers";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookiesStore = await cookies();
  const initialShowSidebar =
    cookiesStore.get("show_sidebar_desktop")?.value === "true";
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Task Manager</title>
      </head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={font.className}>
        <main className="h-full flex">
          <ThemeProvider>
            <SidebarProvider initialShowSidebar={initialShowSidebar}>
              <Sidebar />
              <div className="flex-1 flex flex-col h-full overflow-clip">
                <Header />
                <div className="flex-1 overflow-auto">{children}</div>
              </div>
            </SidebarProvider>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
