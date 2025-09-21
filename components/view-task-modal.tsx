"use client";

import { Dialog } from "@/ui/dialog";
import { DropdownMenu } from "@/ui/dropdown-menu";
import { Select } from "@/ui/select";
import { SubTask } from "@/ui/sub-task";
import { Typography } from "@/ui/typography";
import { Board, Task, useBoardsStore } from "@/hooks/use-boards-store";

type ViewTaskModalProps = {
  show: boolean;
  onHide: () => void;
  board: Board;
  task: Task;
  onTaskDelete: () => void;
  onTaskEdit: () => void;
};

export function ViewTaskModal({
  show,
  board,
  task,
  onHide,
  onTaskDelete,
  onTaskEdit,
}: ViewTaskModalProps) {
  const { completeSubTask, moveTask } = useBoardsStore();

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
                    completeSubTask(task.id, subTask.id, !subTask.completed)
                  }
                  label={subTask.name}
                  completed={!!subTask.completed}
                />
              ))}
            </div>
          </>
        )}
        <Select
          items={board.columns}
          onSelect={(column) => moveTask(task.id, column)}
          placeholder="Select a status"
          selected={task.column}
          label="Status"
        />
      </div>
    </Dialog>
  );
}
