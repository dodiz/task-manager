import { FC, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import classNames from "classnames";
import { AddBoard } from "@/components";
import { useTheme } from "@/hooks";
import { api } from "@/utils/api";
import {
  BoardIcon,
  HideIcon,
  LogoDark,
  LogoLight,
  MoonIcon,
  PlusIcon,
  ShowIcon,
  SunIcon,
  Toggle,
  Typography,
} from "@/ui";
import styles from "./Sidebar.module.scss";

export const Sidebar: FC = () => {
  const { isDark, toggleTheme, toggleSidebar, isSidebarHidden } = useTheme();
  const { data: boards } = api.getBoards.useQuery();
  const [showAddBoard, setShowAddBoard] = useState(false);

  const { id } = useParams();

  return (
    <>
      {showAddBoard && (
        <AddBoard show={showAddBoard} onHide={() => setShowAddBoard(false)} />
      )}
      <aside
        className={classNames(
          styles.container,
          isDark && styles.dark,
          isSidebarHidden && styles.hidden
        )}
      >
        <div>
          {isDark ? (
            <LogoDark className={styles.logo} />
          ) : (
            <LogoLight className={styles.logo} />
          )}
          <div className={styles.boardTitle}>
            <Typography variant="s">ALL BOARDS ({boards?.length})</Typography>
          </div>
          <div className={styles.boards}>
            {boards &&
              boards.map((board) => (
                <Link
                  href={`/${board.id}`}
                  key={board.id}
                  className={classNames(
                    styles.board,
                    +id === board.id && styles.active
                  )}
                >
                  <BoardIcon /> {board.name}
                </Link>
              ))}
            <div
              onClick={() => setShowAddBoard(true)}
              className={classNames(styles.board, styles.newBoard)}
            >
              <BoardIcon />
              <div className={styles.newBoardLabel}>
                <PlusIcon /> Create new board
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.theme}>
            <SunIcon />
            <Toggle checked={isDark} onClick={toggleTheme} />
            <MoonIcon />
          </div>
          <div className={styles.hideLabel} onClick={toggleSidebar}>
            <HideIcon /> Hide Sidebar
          </div>
        </div>
      </aside>
      <div
        className={classNames(
          styles.showButton,
          !isSidebarHidden && styles.hidden
        )}
        onClick={toggleSidebar}
      >
        <ShowIcon />
      </div>
    </>
  );
};
