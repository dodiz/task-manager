"use client";

import { useTheme } from "@/hooks";
import { Typography } from "@/ui";

export default function Page() {
  const { isDark } = useTheme();
  return (
    <div
      className={`${
        isDark ? "bg-dark-300" : "bg-light-200"
      } h-full flex items-center justify-center`}
    >
      <div className="flex flex-col gap-8 items-center">
        <Typography variant="title-m">
          Select or add a board to get started
        </Typography>
      </div>
    </div>
  );
}
