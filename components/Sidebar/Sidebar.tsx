import { FC, useState } from "react";
import classNames from "classnames";
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
} from "@/components";
import { useTheme } from "@/hooks";
import styles from "./Sidebar.module.scss";

const boards = [
  {
    id: 1,
    title: "Platform Launch",
  },
  {
    id: 2,
    title: "Marketing Plan",
  },
  {
    id: 3,
    title: "Roadmap",
  },
];

export const Sidebar: FC = () => {
  const { isDark, toggleTheme, toggleSidebar, isSidebarHidden } = useTheme();
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
            {boards.map((board) => (
              <div
                onClick={() => setSelectedBoard(board.id)}
                key={board.id}
                className={classNames(
                  styles.board,
                  selectedBoard === board.id && styles.active
                )}
              >
                <BoardIcon /> {board.title}
              </div>
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
