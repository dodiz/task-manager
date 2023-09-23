import { FC, useMemo } from "react";
import classNames from "classnames";
import { useTheme } from "@/hooks";
import { TypographyProps } from "./Typography.types";
import styles from "./Typography.module.scss";

export const Typography: FC<TypographyProps> = ({
  children,
  variant,
  className,
}) => {
  const { isDark } = useTheme();

  const typography = useMemo(() => {
    switch (variant) {
      case "title-xl":
        return (
          <h1
            className={classNames(styles.xl, isDark && styles.dark, className)}
          >
            {children}
          </h1>
        );
      case "title-l":
        return (
          <h2
            className={classNames(styles.l, isDark && styles.dark, className)}
          >
            {children}
          </h2>
        );
      case "title-m":
        return (
          <h3
            className={classNames(styles.m, isDark && styles.dark, className)}
          >
            {children}
          </h3>
        );
      case "title-s":
        return (
          <h4
            className={classNames(styles.s, isDark && styles.dark, className)}
          >
            {children}
          </h4>
        );
      case "body-sm":
        return (
          <p
            className={classNames(
              styles.textSm,
              isDark && styles.dark,
              className
            )}
          >
            {children}
          </p>
        );
      default: //body-m
        return (
          <p
            className={classNames(
              styles.text,
              isDark && styles.dark,
              className
            )}
          >
            {children}
          </p>
        );
    }
  }, [variant, children, className, isDark]);

  return typography;
};
