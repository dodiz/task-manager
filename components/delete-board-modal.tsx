"use client";

import { Dialog } from "@/ui/dialog";
import { Typography } from "@/ui/typography";
import { Button } from "@/ui/button";
import { useBoardsStore } from "@/hooks/use-boards-store";

type DeleteBoardModalProps = {
  show: boolean;
  onHide: () => void;
  boardId: string;
};

export function DeleteBoardModal({
  show,
  onHide,
  boardId,
}: DeleteBoardModalProps) {
  const { deleteBoard, selectedBoard } = useBoardsStore();

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <div className="flex flex-col gap-6">
        <Typography className="text-accent-200" variant="title-l">
          Delete this board?
        </Typography>
        <Typography variant="body">
          Are you sure you want to delete the '{selectedBoard?.name}' board?
          This action will remove all columns and tasks and cannot be reversed.
        </Typography>
        <div className="flex gap-4">
          <Button variant="destructive" onClick={() => deleteBoard(boardId)}>
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
