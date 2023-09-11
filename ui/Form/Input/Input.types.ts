import { ComponentProps } from "react";

export type InputProps = {
  label?: string;
  error?: string;
} & ComponentProps<"input">;
