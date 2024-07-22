"use client";

import { PropsWithChildren, createContext, useState } from "react";
import { setCookie } from "cookies-next";

export const SidebarContext = createContext({
  showSidebarDesktop: false,
  showSidebarMobile: false,
  toggleSidebarMobile: () => {},
  toggleSidebar: () => {},
});

export function SidebarProvider({
  children,
  initialShowSidebar,
}: PropsWithChildren & { initialShowSidebar: boolean }) {
  const [showSidebarDesktop, setShowSidebarDesktop] =
    useState(initialShowSidebar);
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  const toggleSidebar = () => {
    setCookie("show_sidebar_desktop", showSidebarDesktop ? "false" : "true");
    setShowSidebarDesktop((p) => !p);
  };

  return (
    <SidebarContext.Provider
      value={{
        showSidebarMobile,
        showSidebarDesktop,
        toggleSidebar,
        toggleSidebarMobile: () => setShowSidebarMobile((p) => !p),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
