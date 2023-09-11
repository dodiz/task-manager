import "@/styles/globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/context";
import { Header, Sidebar } from "@/components";
import { QueryProvider } from "@/app/QueryProvider";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Task manager",
  description: "Task manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryProvider>
        <ThemeProvider>
          <body className={font.className}>
            <main className="min-h-full flex">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <div className="flex-1">{children}</div>
              </div>
            </main>
          </body>
        </ThemeProvider>
      </QueryProvider>
    </html>
  );
}
