import classNames from "classnames";
import { useTheme } from "@/hooks";
import { CheckIcon } from "@/icons/check-icon";
import styles from "./sub-task.module.scss";

type SubTaskProps = {
  completed: boolean;
  label: string;
  onClick: () => void;
};

export function SubTask({ completed, onClick, label }: SubTaskProps) {
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
}
