"use client";

import { useParams, useRouter } from "next/navigation";
import { Dialog } from "@/ui/dialog";
import { Typography } from "@/ui/typography";
import { Button } from "@/ui/button";
import { api } from "@/utils/api";
import styles from "./modals.module.scss";

type DeleteBoardModalProps = {
  show: boolean;
  onHide: () => void;
};

export function DeleteBoardModal({ show, onHide }: DeleteBoardModalProps) {
  const router = useRouter();
  const getBoards = api.boards.getAll.useQuery();
  const { boardId } = useParams();
  const { data } = api.boards.getById.useQuery({ id: +boardId });
  const { mutate: deleteBoard } = api.boards.remove.useMutation({
    onSuccess: () => {
      getBoards.refetch();
      onHide();
      router.push("/");
    },
  });

  return (
    <Dialog show={show} onHide={onHide}>
      <div className={styles.container}>
        <Typography className={styles.label} variant="title-l">
          Delete this board?
        </Typography>
        <Typography variant="body">
          Are you sure you want to delete the '{data?.name}' board? This action
          will remove all columns and tasks and cannot be reversed.
        </Typography>
        <div className={styles.options}>
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
