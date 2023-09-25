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
  LogoMobile,
  ArrowDownIcon,
} from "@/ui";
import { api } from "@/utils/api";
import styles from "./Header.module.scss";

export const Header: FC = () => {
  const { isDark, isSidebarHidden, toggleSidebarMobile } = useTheme();
  const [isDeletingBoard, setIsDeletingBoard] = useState(false);
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { boardId } = useParams();
  const { data: board } = api.boards.getById.useQuery(
    { id: +boardId },
    { enabled: !!boardId }
  );
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
        <div className={styles.left}>
          <div className={styles.logo}>
            {isSidebarHidden ? isDark ? <LogoDark /> : <LogoLight /> : null}
          </div>
          <Typography variant="title-xl">
            {board?.name || "Select a board"}
          </Typography>
        </div>
        <div className={styles.leftMobile} onClick={toggleSidebarMobile}>
          <LogoMobile />
          <Typography variant="title-l" className={styles.titleMobile}>
            {board?.name || "Select a board"}{" "}
          </Typography>
          <ArrowDownIcon className={styles.arrow} />
        </div>
        <div className={styles.right}>
          <Button
            variant="primary-large"
            disabled={!board}
            onClick={() => setIsAddingTask(true)}
          >
            <PlusIcon /> <div className={styles.addTaskLabel}>Add New Task</div>
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
