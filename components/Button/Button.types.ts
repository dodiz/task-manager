import { PropsWithChildren } from "react";

export type ButtonProps = PropsWithChildren & {
  variant?: "primary" | "secondary" | "destructive";
  small?: boolean;
  onClick?: () => void;
};
