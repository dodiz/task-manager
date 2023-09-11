import { ComponentProps, PropsWithChildren } from "react";

export type ButtonProps = PropsWithChildren & {
  variant?: "primary" | "primary-large" | "secondary" | "destructive";
  small?: boolean;
} & ComponentProps<"button">;
