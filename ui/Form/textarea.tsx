"use client";

import { ComponentProps, useState } from "react";
import classNames from "classnames";
import { useTheme } from "@/hooks/useTheme";
import formStyles from "./form.module.scss";

type TextareaProps = ComponentProps<"textarea"> & {
  label?: string;
  error?: string;
};

export function Textarea({
  label,
  onBlur,
  onFocus,
  error,
  ...rest
}: TextareaProps) {
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
        <textarea
          onFocus={(e) => {
            setIsFocused(true);
            onFocus && onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          className={formStyles.textarea}
          {...rest}
        />
        {error && <p className={formStyles.errorMessage}>{error}</p>}
      </div>
    </label>
  );
}
