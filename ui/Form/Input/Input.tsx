import { FC, useState } from "react";
import classNames from "classnames";
import { useTheme } from "@/hooks";
import { InputProps } from "./Input.types";
import formStyles from "../Form.module.scss";

export const Input: FC<InputProps> = ({
  label,
  onBlur,
  onFocus,
  error,
  ...rest
}) => {
  const { isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  return (
    <label
      className={classNames(
        formStyles.group,
        isDark && formStyles.dark,
        isFocused && formStyles.focus
      )}
    >
      {label && <h4 className={formStyles.label}>{label}</h4>}
      <div
        className={classNames(
          formStyles.inputWrapper,
          error && formStyles.error
        )}
      >
        <input
          onFocus={(e) => {
            setIsFocused(true);
            onFocus && onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          className={formStyles.input}
          {...rest}
        />
        {error && <p className={formStyles.errorMessage}>{error}</p>}
      </div>
    </label>
  );
};
