import { FC, useState } from "react";
import { useParams } from "next/navigation";
import classNames from "classnames";
import { DeleteBoardModal, EditBoardModal, AddTaskModal } from "@/components";
import { useTheme } from "@/hooks";
import {
  Button,
  LogoDark,
  LogoLight,
  PlusIcon,
  Typography,
  Dropdown,
} from "@/ui";
import { api } from "@/utils/api";
import styles from "./Header.module.scss";

export const Header: FC = () => {
  const { isDark, isSidebarHidden } = useTheme();
  const [isDeletingBoard, setIsDeletingBoard] = useState(false);
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { id } = useParams();
  const { data: board } = api.getBoard.useQuery({ id: +id }, { enabled: !!id });
  return (
    <>
      {isDeletingBoard && (
        <DeleteBoardModal
          show={isDeletingBoard}
          onHide={() => setIsDeletingBoard(false)}
        />
      )}
      {isEditingBoard && (
        <EditBoardModal
          show={isEditingBoard}
          onHide={() => setIsEditingBoard(false)}
        />
      )}
      {isAddingTask && (
        <AddTaskModal
          show={isAddingTask}
          onHide={() => setIsAddingTask(false)}
        />
      )}
      <header className={classNames(styles.container, isDark && styles.dark)}>
        <div className="flex gap-4">
          {isSidebarHidden ? isDark ? <LogoDark /> : <LogoLight /> : null}
          <Typography variant="xl">
            {board?.name || "Select a board"}
          </Typography>
        </div>
        <div className={styles.right}>
          <Button variant="primary-large" disabled>
            <PlusIcon /> Add New Task
          </Button>
          {board && (
            <Dropdown
              items={[
                {
                  label: "Edit Board",
                  variant: "primary",
                  onClick: () => setIsEditingBoard(true),
                },
                {
                  label: "Delete Board",
                  onClick: () => setIsDeletingBoard(true),
                  variant: "danger",
                },
              ]}
            />
          )}
        </div>
      </header>
    </>
  );
};
