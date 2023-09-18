import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { Dialog, Typography, Button } from "@/ui";
import { api } from "@/utils/api";
import { ModalProps } from "../Modal.types";
import styles from "./DeleteBoard.module.scss";

export const DeleteBoardModal: FC<ModalProps> = ({ show, onHide }) => {
  const router = useRouter();
  const getBoards = api.boards.getAll.useQuery();
  const { boardId } = useParams();
  const { data } = api.boards.getById.useQuery({ id: +boardId });
  const deleteBoard = api.boards.remove.useMutation({
    onSuccess: () => {
      getBoards.refetch();
      onHide();
      router.push("/");
    },
  });

  return (
    <Dialog show={show} onHide={onHide}>
      <div className={styles.container}>
        <div>
          <Typography className={styles.label} variant="l">
            Delete this board?
          </Typography>
        </div>
        <Typography variant="text">
          Are you sure you want to delete the '{data?.name}' board? This action
          will remove all columns and tasks and cannot be reversed.
        </Typography>
        <div className={styles.options}>
          <Button
            variant="destructive"
            onClick={() => deleteBoard.mutate({ id: +boardId })}
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
};
