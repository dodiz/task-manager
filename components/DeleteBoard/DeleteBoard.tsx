import { useParams } from "next/navigation";
import { FC } from "react";
import { Dialog, Typography, Button } from "@/ui";
import { api } from "@/utils/api";
import styles from "./DeleteBoard.module.scss";
import { DeleteBoardProps } from "./DeleteBoard.types";

export const DeleteBoard: FC<DeleteBoardProps> = ({ show, onHide }) => {
  const getBoards = api.getBoards.useQuery();
  const { id } = useParams();
  const { data } = api.getBoard.useQuery({ id: +id });
  const deleteBoard = api.deleteBoard.useMutation({
    onSuccess: () => {
      getBoards.refetch();
      onHide();
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
            onClick={() => deleteBoard.mutate({ id: +id })}
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
