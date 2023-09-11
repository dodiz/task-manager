import { FC, useMemo } from "react";
import cn from "classnames";
import { useTheme } from "@/hooks";
import { ButtonProps } from "./Button.types";
import styles from "./Button.module.scss";

export const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  small,
  ...rest
}) => {
  const { isDark } = useTheme();
  const variantClassName = useMemo(() => styles[variant], [variant]);
  return (
    <button
      className={cn(
        variantClassName,
        small && styles.small,
        isDark && styles.dark
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
