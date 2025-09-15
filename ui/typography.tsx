import { type PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

type TypographyProps = PropsWithChildren & {
  variant: "title-xl" | "title-l" | "title-m" | "title-s" | "body" | "body-sm";
  className?: string;
};

export function Typography({ children, variant, className }: TypographyProps) {
  switch (variant) {
    case "title-xl":
      return (
        <h1
          className={cn(
            "font-bold text-xl dark:text-light-100 text-dark-400",
            className
          )}
        >
          {children}
        </h1>
      );
    case "title-l":
      return (
        <h2
          className={cn(
            "font-bold text-lg text-dark-400 dark:text-light-100",
            className
          )}
        >
          {children}
        </h2>
      );
    case "title-m":
      return (
        <h3
          className={cn(
            "font-bold text-base leading-[1.9rem] text-dark-400 dark:text-light-100",
            className
          )}
        >
          {children}
        </h3>
      );
    case "title-s":
      return (
        <h4
          className={cn(
            "text-xs leading-[1.5rem] font-extrabold text-light-400 tracking-[0.24rem]",
            className
          )}
        >
          {children}
        </h4>
      );
    case "body-sm":
      return (
        <p
          className={cn(
            "font-bold text-xs leading-[1.5rem] text-light-400 dark:text-light-100",
            className
          )}
        >
          {children}
        </p>
      );
    default: //body-m
      return (
        <p
          className={cn(
            "text-[1.3rem] font-medium leading-[2.3rem] text-light-400",
            className
          )}
        >
          {children}
        </p>
      );
  }
}
