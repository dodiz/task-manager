"use client";

import { useTheme } from "@/hooks";
import { Button, PlusIcon, Typography } from "@/ui";

export default function Page() {
  const { isDark } = useTheme();
  return (
    <div
      className={`${
        isDark ? "bg-dark-300" : "bg-light-200"
      } h-full flex items-center justify-center`}
    >
      <div className="flex flex-col gap-8 items-center">
        <Typography variant="l">
          The board is empty. Create a new column to get started.
        </Typography>
        <div>
          <Button>
            <PlusIcon /> Add New Column
          </Button>
        </div>
      </div>
    </div>
  );
}
