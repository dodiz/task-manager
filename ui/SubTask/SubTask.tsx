import { FC } from "react";
import classNames from "classnames";
import { Checkbox } from "@/ui";
import { SubTaskProps } from "./SubTask.types";
import styles from "./SubTask.module.scss";

export const SubTask: FC<SubTaskProps> = ({ completed, onClick, label }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <Checkbox checked={completed} />
      <label
        className={classNames(styles.label, completed && styles.completed)}
      >
        {label}
      </label>
    </div>
  );
};
