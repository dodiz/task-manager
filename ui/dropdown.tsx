"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";
import { RiMore2Fill } from "@remixicon/react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { Typography } from "@/ui/typography";

type DropdownProps = {
  items: {
    onClick: () => void;
    label: string;
    variant?: "danger" | "primary";
  }[];
  align?: "center" | "right";
};

export function Dropdown({ items, align }: DropdownProps) {
  const [show, setShow] = useState(false);
  const ref = useClickOutside(() => setShow(false));
  return (
    <div className="relative">
      <RiMore2Fill
        className="text-light-400 size-7 cursor-pointer hover:text-primary-200"
        onClick={() => setShow(true)}
      />
      <div
        ref={ref}
        aria-hidden={!show}
        className={cn(
          "aria-hidden:hidden flex z-10 absolute right-0 top-[200%] w-max rounded-xl bg-light-100 p-4 flex-col gap-4 shadow-lg dark:bg-dark-300",
          align === "center" && "left-1/2 -translate-x-1/2"
        )}
      >
        {items.map(({ label, onClick, variant }, i) => (
          <div key={i} onClick={onClick}>
            <Typography
              variant="body"
              className={cn(
                "w-64 cursor-pointer",
                variant === "danger" && "text-accent-200 dark:text-accent-200"
              )}
            >
              {label}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}
