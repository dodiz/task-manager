import { ComponentProps } from "react";

type GenericInputProps = {
  label?: string;
  error?: string;
};

export type InputProps = GenericInputProps & ComponentProps<"input">;
export type TextareaProps = GenericInputProps & ComponentProps<"textarea">;
