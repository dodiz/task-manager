"use client";

import { SpinnerIcon } from "@/icons/spinner-icon";
import { Typography } from "@/ui/typography";
import { api } from "@/utils/api";

export default function Page() {
  const { isError, isLoading } = api.boards.getAll.useQuery();
  return (
    <div className="dark:bg-dark-300 bg-light-200h-full flex items-center justify-center">
      <div className="flex flex-col gap-8 items-center">
        {isLoading ? (
          <SpinnerIcon />
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
