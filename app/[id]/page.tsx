"use client";
import { useMemo } from "react";
import classNames from "classnames";
import { useTheme } from "@/hooks";
import { Button, LoadingSpinner, PlusIcon, Typography } from "@/ui";
import { api } from "@/utils/api";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { isDark } = useTheme();
  const {
    data: board,
    isLoading,
    isError,
  } = api.boards.getById.useQuery({ id: +id }, { enabled: !!id });

  const containerClassName = useMemo(() => {
    return `${isDark ? "bg-dark-300" : "bg-light-200"} h-full`;
  }, [isDark]);

  if (isLoading) {
    return (
      <div
        className={classNames(
          containerClassName,
          "flex items-center justify-center"
        )}
      >
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={classNames(
          containerClassName,
          "flex flex-col gap-4 items-center justify-center"
        )}
      >
        <Typography variant="l">Something went wrong.</Typography>
        <Typography variant="text">
          No board was found with id "{id}"
        </Typography>
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      {board!.columns.length ? (
        <div className="flex gap-6 p-8">
          {board!.columns.map((column) => (
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
