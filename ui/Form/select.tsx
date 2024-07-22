"use client";

import { useState } from "react";
import classNames from "classnames";
import { useTheme } from "@/hooks/useTheme";
import { ArrowDownIcon } from "@/icons/arrow-down-icon";
import styles from "./select.module.scss";
import formStyles from "./form.module.scss";

type SelectProps<T> = {
  items: T[];
  valueField: keyof T;
  labelField: (item: T) => string;
  selected: T | null;
  onSelect: (item: T) => void;
  label?: string;
  placeholder: string;
  disabled?: boolean;
  error?: string;
};

export const Select = <T,>({
  items,
  valueField,
  labelField,
  onSelect,
  selected,
  label,
  placeholder,
  error,
}: SelectProps<T>) => {
  const [show, setShow] = useState(false);
  const { isDark } = useTheme();

  return (
    <label
      onClick={() => setShow((p) => !p)}
      className={classNames(
        formStyles.group,
        styles.container,
        isDark && styles.dark
      )}
    >
      {label && <h4 className={formStyles.label}>{label}</h4>}
      <div
        className={classNames(
          formStyles.inputWrapper,
          error && formStyles.error,
          styles.selectBox,
          show && styles.show
        )}
      >
        {selected ? labelField(selected) : placeholder}
        {error && (
          <p className={classNames(formStyles.errorMessage, styles.error)}>
            {error}
          </p>
        )}
        <ArrowDownIcon className={styles.arrow} />
      </div>
      <div className={classNames(styles.items, show && styles.show)}>
        {items.map((item) => (
          <div
            onClick={() => onSelect(item)}
            key={item[valueField] as string | number}
            className={styles.item}
          >
            {labelField(item)}
          </div>
        ))}
      </div>
    </label>
  );
};
