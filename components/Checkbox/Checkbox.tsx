import { FC } from "react";
import { CheckIcon } from "@/components";
import { CheckboxProps } from "./Checkbox.types";
import styles from "./Checkbox.module.scss";

export const Checkbox: FC<CheckboxProps> = (props) => {
  return (
    <label>
      <input className={styles.checkboxInput} type="checkbox" {...props} />
      <div className={styles.checkbox}>
        <CheckIcon />
      </div>
    </label>
  );
};
