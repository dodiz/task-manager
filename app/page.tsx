"use client";

import { Board } from "@/components/board";
import { useBoardsStore } from "@/hooks/use-boards-store";
import { Typography } from "@/ui/typography";

export default function Page() {
  const { selectedBoard } = useBoardsStore();
  if (selectedBoard) {
    return <Board />;
  }
  return (
    <div className="dark:bg-dark-300 bg-light-200 h-full flex items-center justify-center">
      <div className="flex flex-col gap-8 items-center">
        <Typography variant="title-m">
          Select or add a board to get started
        </Typography>
      </div>
    </div>
  );
}
