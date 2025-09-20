"use client";

import { Dialog } from "@/ui/dialog";
import { DropdownMenu } from "@/ui/dropdown-menu";
import { Select } from "@/ui/select";
import { SubTask } from "@/ui/sub-task";
import { Typography } from "@/ui/typography";
import { api } from "@/utils/api";
import { Column, Task } from "@/server/types";

type ViewTaskModalProps = {
  task: Task;
  columns: Column[];
  selectedColumn: Column | null;
  onTaskUpdate: () => void;
  onTaskDelete: () => void;
  onTaskEdit: () => void;
  show: boolean;
  onHide: () => void;
};

export function ViewTaskModal({
  show,
  task,
  columns,
  selectedColumn,
  onHide,
  onTaskUpdate,
  onTaskDelete,
  onTaskEdit,
}: ViewTaskModalProps) {
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
    <Dialog open={show} onOpenChange={onHide}>
      <div className="flex flex-col gap-6">
        <div className="flex pt-2 justify-between items-center">
          <Typography variant="title-l">{task.name}</Typography>
          <DropdownMenu
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
            <div className="flex flex-col gap-3">
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
}
