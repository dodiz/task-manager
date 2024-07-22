"use client";

import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from "react";
import { setCookie, getCookie } from "cookies-next";

export const SidebarContext = createContext({
  isSidebarHidden: false,
  showSidebarMobile: false,
  toggleSidebarMobile: () => {},
  toggleSidebar: () => {},
});

export const SidebarProvider: FC<PropsWithChildren> = ({ children }) => {
  const initialSidebarStatus = getCookie("isSidebarHidden") === "true";

  const [isSidebarHidden, setIsSidebarHidden] = useState(initialSidebarStatus);
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  const toggleSidebar = useCallback(() => {
    setCookie("isSidebarHidden", (!isSidebarHidden).toString());
    setIsSidebarHidden((prev) => !prev);
  }, [isSidebarHidden]);

  const toggleSidebarMobile = useCallback(() => {
    setShowSidebarMobile((prev) => !prev);
  }, [setShowSidebarMobile]);

  return (
    <SidebarContext.Provider
      value={{
        toggleSidebar,
        showSidebarMobile,
        toggleSidebarMobile,
        isSidebarHidden,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
