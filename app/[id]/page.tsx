"use client";
import { useTheme } from "@/hooks";
import { Button, PlusIcon, Typography } from "@/ui";
import { api } from "@/utils/api";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { isDark } = useTheme();
  const { data: board } = api.getBoard.useQuery({ id: +id });
  return (
    <div className={`${isDark ? "bg-dark-300" : "bg-light-200"} h-full`}>
      {board?.columns.length ? (
        <div className="flex gap-6 p-8">
          {board.columns.map((column) => (
            <div key={column.id} className="w-[280px]">
              <Typography variant="s">
                {column.name?.toUpperCase()} (4)
              </Typography>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-8 h-full items-center justify-center">
          <Typography variant="text">
            The board is empty. Create a new column to get started.
          </Typography>
          <div className="flex justify-center">
            <Button>
              <PlusIcon /> Add New Column
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
