import { FC } from "react";
import classNames from "classnames";
import { useTheme } from "@/hooks";
import { Typography } from "@/ui";
import { TaskCardProps } from "./TaskCard.types";
import styles from "./TaskCard.module.scss";

export const TaskCard: FC<TaskCardProps> = ({
  label,
  onClick,
  subCompleted,
  subTotal,
}) => {
  const { isDark } = useTheme();
  return (
    <div
      onClick={onClick}
      className={classNames(styles.container, isDark && styles.dark)}
    >
      <Typography variant="title-m">{label}</Typography>
      <Typography variant="body">
        {subCompleted} / {subTotal} subtasks
      </Typography>
    </div>
  );
};
