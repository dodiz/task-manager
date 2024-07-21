import { type ComponentProps, useState } from "react";
import classNames from "classnames";
import { useTheme } from "@/hooks";
import formStyles from "./form.module.scss";

type InputProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
};

export function Input({ label, onBlur, onFocus, error, ...rest }: InputProps) {
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
}
