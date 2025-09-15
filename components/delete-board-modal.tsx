"use client";

import { useRouter } from "next/navigation";
import { Dialog } from "@/ui/dialog";
import { Typography } from "@/ui/typography";
import { Button } from "@/ui/button";
import { api } from "@/utils/api";

type DeleteBoardModalProps = {
  show: boolean;
  onHide: () => void;
  boardId: number;
};

export function DeleteBoardModal({
  show,
  onHide,
  boardId,
}: DeleteBoardModalProps) {
  const router = useRouter();
  const getBoards = api.boards.getAll.useQuery();
  const { data } = api.boards.getById.useQuery({ id: boardId });
  const { mutate: deleteBoard } = api.boards.remove.useMutation({
    onSuccess: () => {
      getBoards.refetch();
      onHide();
      router.push("/");
    },
  });

  return (
    <Dialog show={show} onHide={onHide}>
      <div className="flex flex-col gap-6">
        <Typography className="text-accent-200" variant="title-l">
          Delete this board?
        </Typography>
        <Typography variant="body">
          Are you sure you want to delete the '{data?.name}' board? This action
          will remove all columns and tasks and cannot be reversed.
        </Typography>
        <div className="flex gap-4">
          <Button
            variant="destructive"
            onClick={() => deleteBoard({ id: +boardId })}
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
