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
  toggleTheme: () => {},
  toggleSidebar: () => {},
});

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const initialTheme = getCookie("theme") || "light";
  const initialSidebarStatus = getCookie("isSidebarHidden") === "true";

  const [isDark, setIsDark] = useState(initialTheme === "dark");
  const [isSidebarHidden, setIsSidebarHidden] = useState(initialSidebarStatus);

  const toggleTheme = useCallback(() => {
    setCookie("theme", isDark ? "light" : "dark");
    setIsDark(!isDark);
  }, [isDark]);

  const toggleSidebar = useCallback(() => {
    setCookie("isSidebarHidden", (!isSidebarHidden).toString());
    setIsSidebarHidden((prev) => !prev);
  }, [isSidebarHidden]);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        toggleSidebar,
        isSidebarHidden,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
