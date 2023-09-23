import { FC } from "react";
import { CheckIcon } from "@/ui";
import { CheckboxProps } from "./Checkbox.types";
import styles from "./Checkbox.module.scss";

export const Checkbox: FC<CheckboxProps> = ({ onChange, checked }) => {
  return (
    <label>
      <input
        className={styles.checkboxInput}
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
      <div className={styles.checkbox}>
        <CheckIcon />
      </div>
    </label>
  );
};
