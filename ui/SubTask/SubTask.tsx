import { FC } from "react";
import classNames from "classnames";
import { useTheme } from "@/hooks";
import { CheckIcon } from "@/ui";
import { SubTaskProps } from "./SubTask.types";
import styles from "./SubTask.module.scss";

export const SubTask: FC<SubTaskProps> = ({ completed, onClick, label }) => {
  const { isDark } = useTheme();
  return (
    <div
      className={classNames(styles.container, isDark && styles.dark)}
      onClick={onClick}
    >
      <div className={classNames(styles.checkbox, completed && styles.checked)}>
        <CheckIcon className={styles.checkIcon} />
      </div>
      <p className={classNames(styles.label, completed && styles.completed)}>
        {label}
      </p>
    </div>
  );
};
