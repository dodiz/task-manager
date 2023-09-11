import { FC } from "react";
import classNames from "classnames";
import { ToggleProps } from "./Toggle.types";
import styles from "./Toggle.module.scss";

export const Toggle: FC<ToggleProps> = ({ checked = false, onClick }) => {
  return (
    <div className={styles.toggle} onClick={onClick}>
      <div
        className={classNames(styles.toggleButton, checked && styles.checked)}
      />
    </div>
  );
};
