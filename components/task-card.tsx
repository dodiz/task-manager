"use client";

import { Typography } from "@/ui/typography";

type TaskCardProps = {
  label: string;
  subCompleted: number;
  subTotal: number;
  id: number;
  onClick: () => void;
};

export function TaskCard({
  label,
  onClick,
  subCompleted,
  subTotal,
  id,
}: TaskCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", id.toString());
      }}
      onClick={onClick}
      className="py-6 px-4 rounded-xl bg-light-100 flex flex-col gap-2 cursor-pointer dark:bg-dark-200"
    >
      <Typography variant="title-m">{label}</Typography>
      <Typography variant="body">
        {subTotal === 0
          ? "No subtasks"
          : `${subCompleted} of ${subTotal} subtasks`}
      </Typography>
    </div>
  );
}
