import type { ComponentProps, PropsWithChildren } from "react";
import cn from "classnames";

type ButtonProps = PropsWithChildren & {
  variant?: "primary" | "primary-large" | "secondary" | "destructive";
  small?: boolean;
} & ComponentProps<"button">;

export function Button({
  children,
  variant = "primary",
  small,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-[2.4rem] flex items-center justify-center gap-3 select-none whitespace-nowrap leading-normal font-bold text-[1.3rem] w-full disabled:opacity/25 disabled:cursor-not-allowed py-[1rem] px-4 tablet:py-[1.4rem] tablet:px-6",
        variant === "primary" &&
          "bg-primary-200 text-light-100 hover:bg-primary-100",
        variant === "primary-large" &&
          "bg-primary-200 text-light-100 hover:bg-primary-100 text-[1.5rem]",
        variant === "secondary" &&
          "bg-primary-200/10 text-primary-200 hover:bg-primary/25 dark:bg-light-100",
        variant === "destructive" &&
          "bg-accent-200 text-light-100 hover:bg-accent-100"
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
