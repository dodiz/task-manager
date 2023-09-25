"use client";

import { useTheme } from "@/hooks";
import { LoadingSpinner, Typography } from "@/ui";
import { api } from "@/utils/api";

export default function Page() {
  const { isDark } = useTheme();
  const { isError, isLoading } = api.boards.getAll.useQuery();
  return (
    <div
      className={`${
        isDark ? "bg-dark-300" : "bg-light-200"
      } h-full flex items-center justify-center`}
    >
      <div className="flex flex-col gap-8 items-center">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Typography variant="title-m">
            {isError
              ? "Backend error. DB might be offline or full"
              : "Select or add a board to get started"}
          </Typography>
        )}
      </div>
    </div>
  );
}
