import { FC } from "react";
import { useParams } from "next/navigation";
import { Dialog, Typography, Button } from "@/ui";
import { api } from "@/utils/api";
import { ModalProps } from "../Modal.types";
import styles from "./DeleteModal.module.scss";

type DeleteTaskModalProps = {
  taskId: number;
} & ModalProps;

export const DeleteTaskModal: FC<DeleteTaskModalProps> = ({
  show,
  onHide,
  taskId,
}) => {
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
      <div className={styles.container}>
        <Typography className={styles.label} variant="title-l">
          Delete this task?
        </Typography>
        <Typography variant="body">
          Are you sure you want to delete this task? This action cannot be
          reversed.
        </Typography>
        <div className={styles.options}>
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
};
