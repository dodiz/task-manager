import { FC } from "react";
import classNames from "classnames";
import { useTheme } from "@/hooks";
import { TypographyProps } from "./Typography.types";
import styles from "./Typography.module.scss";

export const Typography: FC<TypographyProps> = ({ children, variant }) => {
  const { isDark } = useTheme();

  switch (variant) {
    case "xl":
      return (
        <h1 className={classNames(styles.xl, isDark && styles.dark)}>
          {children}
        </h1>
      );
    case "l":
      return (
        <h2 className={classNames(styles.l, isDark && styles.dark)}>
          {children}
        </h2>
      );
    case "m":
      return (
        <h3 className={classNames(styles.m, isDark && styles.dark)}>
          {children}
        </h3>
      );
    case "s":
      return (
        <h4 className={classNames(styles.s, isDark && styles.dark)}>
          {children}
        </h4>
      );
    case "text-sm":
      return (
        <p className={classNames(styles.textSm, isDark && styles.dark)}>
          {children}
        </p>
      );
    default:
      return (
        <p className={classNames(styles.text, isDark && styles.dark)}>
          {children}
        </p>
      );
  }
};
