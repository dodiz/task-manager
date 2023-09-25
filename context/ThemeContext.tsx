"use client";

import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from "react";
import { setCookie, getCookie } from "cookies-next";

export const ThemeContext = createContext({
  isDark: false,
  isSidebarHidden: false,
  showSidebarMobile: false,
  toggleSidebarMobile: () => {},
  toggleTheme: () => {},
  toggleSidebar: () => {},
});

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const initialTheme = getCookie("theme") || "light";
  const initialSidebarStatus = getCookie("isSidebarHidden") === "true";

  const [isDark, setIsDark] = useState(initialTheme === "dark");
  const [isSidebarHidden, setIsSidebarHidden] = useState(initialSidebarStatus);
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  const toggleTheme = useCallback(() => {
    setCookie("theme", isDark ? "light" : "dark");
    setIsDark(!isDark);
  }, [isDark]);

  const toggleSidebar = useCallback(() => {
    setCookie("isSidebarHidden", (!isSidebarHidden).toString());
    setIsSidebarHidden((prev) => !prev);
  }, [isSidebarHidden]);

  const toggleSidebarMobile = useCallback(() => {
    setShowSidebarMobile((prev) => !prev);
  }, [setShowSidebarMobile]);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        toggleSidebar,
        showSidebarMobile,
        toggleSidebarMobile,
        isSidebarHidden,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
