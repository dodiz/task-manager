"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ToggleTheme() {
  const { setTheme, resolvedTheme: theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="m-6 flex p-4 justify-center items-center gap-6 bg-light-200 rounded-lg dark:bg-dark-300">
      <Sun className="size-5 text-light-400" />
      <div
        className="p-1 bg-primary-200 rounded-[5rem] w-12 cursor-pointer relative h-[2.1rem]"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {mounted ? (
          <div
            aria-checked={mounted ? theme === "dark" : false}
            className="absolute left-[.34rem] w-[1.4rem] h-[1.4rem] rounded-full bg-white transition-all aria-checked:left-[2.94rem]"
          />
        ) : (
          <div className="absolute left-1/2 -translate-x-1/2 w-[1rem] h-[1rem] rounded-full bg-white" />
        )}
      </div>
      <Moon className="size-5 text-light-400" />
    </div>
  );
}
