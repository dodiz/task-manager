"use client";

import { useState } from "react";
import classNames from "classnames";
import { useClickOutside } from "@/hooks/use-click-outside";
import { DotsIcon } from "@/icons/dots-icon";
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
    <div className="relative" onClick={() => setShow((p) => !p)}>
      <DotsIcon className="cursor-pointer w-[3rem]" />
      <div
        ref={ref}
        className={classNames(
          "z-10 absolute right-0 top-[200%] w-max rounded-xl bg-light-100 p-4 flex-col gap-4 shadow-lg dark:bg-dark-300",
          show ? "flex" : "hidden",
          align === "center" && "left-1/2 -translate-x-1/2"
        )}
      >
        {items.map(({ label, onClick, variant }, i) => (
          <div key={i} onClick={onClick}>
            <Typography
              variant="body"
              className={classNames(
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
