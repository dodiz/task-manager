import { FC } from "react";
import { Dialog, SubTask, Typography } from "@/ui";
import { ViewTaskModalProps } from "./Modal.types";
import { api } from "@/utils/api";
import styles from "./Modals.module.scss";

export const ViewTaskModal: FC<ViewTaskModalProps> = ({
  show,
  onHide,
  task,
  onTaskUpdate,
}) => {
  const { mutate: completeTask } = api.tasks.completeSubTask.useMutation({
    onSuccess: () => {
      onTaskUpdate();
    },
  });
  return (
    <Dialog onHide={onHide} show={show}>
      <div className={styles.container}>
        <Typography variant="title-l">{task.name}</Typography>
        <Typography variant="body">{task.description}</Typography>
        <Typography variant="body">
          SubTasks ({task.subTasks.filter((s) => s.completed).length} of{" "}
          {task.subTasks.length})
        </Typography>
        <div className={styles.columns}>
          {task.subTasks.map((subTask) => (
            <SubTask
              key={subTask.id}
              onClick={() =>
                completeTask({ id: subTask.id, completed: !subTask.completed })
              }
              label={subTask.name}
              completed={!!subTask.completed}
            />
          ))}
        </div>
      </div>
    </Dialog>
  );
};
