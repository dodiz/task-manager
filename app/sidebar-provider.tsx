"use client";

import { PropsWithChildren, createContext, useState } from "react";

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
