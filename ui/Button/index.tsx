import type { ComponentProps, PropsWithChildren } from "react";
import cn from "classnames";
import { useTheme } from "@/hooks";
import styles from "./button.module.scss";

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
  const { isDark } = useTheme();
  return (
    <button
      className={cn(
        styles[variant],
        small && styles.small,
        isDark && styles.dark
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
