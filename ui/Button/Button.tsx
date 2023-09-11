import { FC, useMemo } from "react";
import cn from "classnames";
import { ButtonProps } from "./Button.types";
import styles from "./Button.module.scss";

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  small,
}) => {
  const variantClassName = useMemo(() => styles[variant], [variant]);
  return (
    <button
      className={cn(variantClassName, small && styles.small)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
