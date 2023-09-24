"use client";

import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from "react";

export const ThemeContext = createContext({
  theme: "light",
  isDark: false,
  isSidebarHidden: false,
  toggleTheme: () => {},
  toggleSidebar: () => {},
});

const IS_CLIENT = typeof window !== "undefined";

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState(
    IS_CLIENT ? localStorage.getItem("theme") || "light" : "light"
  );
  const [isSidebarHidden, setIsSidebarHidden] = useState(
    IS_CLIENT
      ? localStorage.getItem("isSidebarHidden") === "true" || false
      : false
  );

  const toggleTheme = useCallback(() => {
    if (!IS_CLIENT) return;
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }, [theme]);

  const toggleSidebar = useCallback(() => {
    if (!IS_CLIENT) return;
    setIsSidebarHidden((prev) => !prev);
    localStorage.setItem("isSidebarHidden", String(!isSidebarHidden));
  }, [isSidebarHidden]);

  return (
    <ThemeContext.Provider
      value={{
        isDark: theme !== "light",
        theme,
        toggleTheme,
        toggleSidebar,
        isSidebarHidden,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
