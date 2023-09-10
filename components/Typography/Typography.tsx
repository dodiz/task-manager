import { FC } from "react";
import { TypographyProps } from "./Typography.types";
import styles from "./Typography.module.scss";

export const Typography: FC<TypographyProps> = ({ children, variant }) => {
  switch (variant) {
    case "xl":
      return <h1 className={styles.xl}>{children}</h1>;
    case "l":
      return <h2 className={styles.l}>{children}</h2>;
    case "m":
      return <h3 className={styles.m}>{children}</h3>;
    case "s":
      return <h4 className={styles.s}>{children}</h4>;
    case "text-sm":
      return <p className={styles.textSm}>{children}</p>;
    default:
      return <p className={styles.text}>{children}</p>;
  }
};
