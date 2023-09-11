import { FC, useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { useTheme } from "@/hooks";
import styles from "./Sidebar.module.scss";
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

export const Sidebar: FC = () => {
  const { isDark, toggleTheme, toggleSidebar, isSidebarHidden } = useTheme();
  const { data } = api.getBoards.useQuery();
  const [selectedBoard, setSelectedBoard] = useState(1);
  return (
    <>
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
            <Typography variant="s">ALL BOARDS (3)</Typography>
          </div>
          <div className={styles.boards}>
            {data?.boards &&
              data.boards.map((board) => (
                <Link
                  href={`/${board.id}`}
                  onClick={() => setSelectedBoard(board.id)}
                  key={board.id}
                  className={classNames(
                    styles.board,
                    selectedBoard === board.id && styles.active
                  )}
                >
                  <BoardIcon /> {board.name}
                </Link>
              ))}
            <div className={classNames(styles.board, styles.newBoard)}>
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
