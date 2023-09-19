import { FC } from "react";
import { Dialog, SubTask, Typography } from "@/ui";
import { ViewTaskModalProps } from "./Modal.types";
import { api } from "@/utils/api";

export const ViewTaskModal: FC<ViewTaskModalProps> = ({
  show,
  onHide,
  task,
}) => {
  const { mutate: completeTask } = api.tasks.completeSubTask.useMutation();
  return (
    <Dialog onHide={onHide} show={show}>
      <Typography variant="l">{task.name}</Typography>
      <Typography variant="text">{task.description}</Typography>
      <Typography variant="m">
        SubTasks ({task.subTasks.filter((s) => s.completed).length} of
        {task.subTasks.length})
      </Typography>
      {task.subTasks.map((subTask) => (
        <SubTask
          key={subTask.id}
          onClick={() => completeTask({ id: subTask.id, completed: true })}
          label={subTask.name}
          completed={!!subTask.completed}
        />
      ))}
    </Dialog>
  );
};
