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

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isSidebarHidden, setIsSidebarHidden] = useState(
    localStorage.getItem("isSidebarHidden") === "true" || false
  );

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }, [theme]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarHidden((prev) => !prev);
    localStorage.setItem("isSidebarHidden", String(!isSidebarHidden));
  }, []);

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
