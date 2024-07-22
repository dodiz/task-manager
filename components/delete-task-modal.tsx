"use client";

import { useParams } from "next/navigation";
import { Dialog } from "@/ui/dialog";
import { Typography } from "@/ui/typography";
import { Button } from "@/ui/button";
import { api } from "@/utils/api";

type DeleteTaskModalProps = {
  taskId: number;
  onHide: () => void;
  show: boolean;
};

export function DeleteTaskModal({
  show,
  onHide,
  taskId,
}: DeleteTaskModalProps) {
  const { boardId } = useParams();
  const { refetch: refetchBoard } = api.boards.getById.useQuery({
    id: +boardId,
  });
  const { mutate: deleteTask } = api.tasks.remove.useMutation({
    onSuccess: () => {
      refetchBoard();
      onHide();
    },
  });

  return (
    <Dialog show={show} onHide={onHide}>
      <div className="flex flex-col gap-6">
        <Typography className="text-accent-200" variant="title-l">
          Delete this task?
        </Typography>
        <Typography variant="body">
          Are you sure you want to delete this task? This action cannot be
          reversed.
        </Typography>
        <div className="flex gap-4">
          <Button
            variant="destructive"
            onClick={() => deleteTask({ id: taskId })}
          >
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
