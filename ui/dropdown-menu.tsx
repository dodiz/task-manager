"use client";

import { cn } from "@/utils/cn";
import { Typography } from "@/ui/typography";
import { Root, Trigger, Content, Portal } from "@radix-ui/react-dropdown-menu";
import { MoreVertical } from "lucide-react";

interface DropdownMenuProps {
  items: {
    onClick: () => void;
    label: string;
    variant?: "danger" | "primary";
  }[];
}

export function DropdownMenu({ items }: DropdownMenuProps) {
  return (
    <Root>
      <Trigger>
        <MoreVertical className="text-light-400 size-7 cursor-pointer hover:text-primary-200" />
      </Trigger>
      <Portal>
        <Content
          data-slot="dropdown-menu-content"
          sideOffset={4}
          side="bottom"
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 z-50 min-w-[8rem] overflow-x-hidden overflow-y-auto",
            "flex rounded-xl bg-light-100 p-4 flex-col gap-4 shadow-lg dark:bg-dark-300"
          )}
        >
          {items.map(({ label, onClick, variant }, i) => (
            <Typography
              key={i}
              onClick={onClick}
              variant="body"
              className={cn(
                "w-64 cursor-pointer",
                variant === "danger" && "text-accent-200 dark:text-accent-200"
              )}
            >
              {label}
            </Typography>
          ))}
        </Content>
      </Portal>
    </Root>
  );
}
