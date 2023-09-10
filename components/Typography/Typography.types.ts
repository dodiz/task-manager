import { PropsWithChildren } from "react";

export type TypographyProps = PropsWithChildren & {
  variant: "xl" | "l" | "m" | "s" | "text" | "text-sm";
};
