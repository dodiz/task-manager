"use client";

import { Dialog } from "@/ui/dialog";
import { Typography } from "@/ui/typography";
import { Button } from "@/ui/button";
import { useBoardsStore } from "@/hooks/use-boards-store";

type DeleteTaskModalProps = {
  onHide: () => void;
  show: boolean;
  taskId: string;
};

export function DeleteTaskModal({
  show,
  onHide,
  taskId,
}: DeleteTaskModalProps) {
  const { deleteTask } = useBoardsStore();

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <div className="flex flex-col gap-6">
        <Typography className="text-accent-200" variant="title-l">
          Delete this task?
        </Typography>
        <Typography variant="body">
          Are you sure you want to delete this task? This action cannot be
          reversed.
        </Typography>
        <div className="flex gap-4">
          <Button variant="destructive" onClick={() => deleteTask(taskId)}>
            Delete
          </Button>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
