import { FC } from "react";
import classNames from "classnames";
import { SubTaskProps } from "./SubTask.types";
import styles from "./SubTask.module.scss";
import { Checkbox } from "@/components";

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
