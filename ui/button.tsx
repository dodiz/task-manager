import type { ComponentProps, PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

type ButtonProps = PropsWithChildren & {
  variant?: "primary" | "secondary" | "destructive";
  size?: "medium" | "large";
} & ComponentProps<"button">;

export function Button({
  children,
  variant = "primary",
  size = "medium",
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-[2.4rem] flex items-center justify-center gap-3 select-none whitespace-nowrap leading-normal font-bold w-full disabled:opacity-25 disabled:cursor-not-allowed py-1 px-4 tablet:py-[1.4rem] tablet:px-6 transition-all duration-300",
        variant === "primary" &&
          "bg-primary-200 text-light-100 hover:bg-primary-100",
        variant === "secondary" &&
          "bg-primary-200/10 text-primary-200 hover:bg-primary/25 dark:bg-light-100",
        variant === "destructive" &&
          "bg-accent-200 text-light-100 hover:bg-accent-100",
        size === "large" ? "text-[1.5rem]" : "text-[1.3rem]",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
