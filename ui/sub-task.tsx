"use client";

import { RiCheckLine } from "@remixicon/react";

type SubTaskProps = {
  completed: boolean;
  label: string;
  onClick: () => void;
};

export function SubTask({ completed, onClick, label }: SubTaskProps) {
  return (
    <div
      className="p-3 flex items-center gap-4 bg-light-200 rounded-[.4rem] cursor-pointer text-nowrap hover:bg-primary-200/25 dark:bg-dark-300"
      onClick={onClick}
    >
      <div
        aria-checked={completed}
        className="flex items-center justify-center border border-[#828fa340] bg-light-100 rounded-[.2rem] w-4 h-4 cursor-pointer dark:bg-dark-200 aria-checked:bg-primary-200 aria-checked:dark:bg-primary-200"
      >
        <RiCheckLine
          aria-checked={completed}
          className={"w-4 text-white aria-checked:block hidden"}
        />
      </div>
      <p
        aria-checked={completed}
        className="text-dark-400 dark:text-light-100 text-xs font-bold select-none aria-checked:line-through aria-checked:opacity-50"
      >
        {label}
      </p>
    </div>
  );
}
