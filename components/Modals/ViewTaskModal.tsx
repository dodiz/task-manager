import { FC } from "react";
import { Dialog, Dropdown, Select, SubTask, Typography } from "@/ui";
import { api } from "@/utils/api";
import { ViewTaskModalProps } from "./Modal.types";
import styles from "./Modals.module.scss";

export const ViewTaskModal: FC<ViewTaskModalProps> = ({
  show,
  task,
  columns,
  selectedColumn,
  onHide,
  onTaskUpdate,
  onTaskDelete,
  onTaskEdit,
}) => {
  const { mutate: completeTask } = api.tasks.completeSubTask.useMutation({
    onSuccess: () => {
      onTaskUpdate();
    },
  });
  const { mutate: moveTask } = api.tasks.move.useMutation({
    onSuccess: () => {
      onTaskUpdate();
    },
  });

  return (
    <Dialog onHide={onHide} show={show}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Typography variant="title-l">{task.name}</Typography>
          <Dropdown
            align="center"
            items={[
              {
                label: "Edit Task",
                variant: "primary",
                onClick: onTaskEdit,
              },
              {
                label: "Delete Task",
                onClick: onTaskDelete,
                variant: "danger",
              },
            ]}
          />
        </div>
        <Typography variant="body">{task.description}</Typography>
        {task.subTasks.length > 0 && (
          <>
            <Typography variant="body">
              SubTasks ({task.subTasks.filter((s) => s.completed).length} of{" "}
              {task.subTasks.length})
            </Typography>
            <div className={styles.columns}>
              {task.subTasks.map((subTask) => (
                <SubTask
                  key={subTask.id}
                  onClick={() =>
                    completeTask({
                      id: subTask.id,
                      completed: !subTask.completed,
                    })
                  }
                  label={subTask.name}
                  completed={!!subTask.completed}
                />
              ))}
            </div>
          </>
        )}
        <Select
          labelField={(column) => column.name}
          valueField="id"
          onSelect={(column) =>
            moveTask({
              taskId: task.id,
              columnId: column.id,
            })
          }
          placeholder="Select a status"
          items={columns}
          selected={selectedColumn}
          label="Status"
        />
      </div>
    </Dialog>
  );
};
