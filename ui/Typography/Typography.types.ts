import { PropsWithChildren } from "react";

export type TypographyProps = PropsWithChildren & {
  variant: "title-xl" | "title-l" | "title-m" | "title-s" | "body" | "body-sm";
  className?: string;
};
