import { FC, useState } from "react";
import classNames from "classnames";
import styles from "./Sidebar.module.scss";
import {
  BoardIcon,
  HideIcon,
  LogoLight,
  MoonIcon,
  PlusIcon,
  SunIcon,
  Toggle,
  Typography,
} from "@/components";

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
  const [toggle, setToggle] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(1);
  return (
    <aside className={styles.container}>
      <div>
        <LogoLight className={styles.logo} />
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
          <Toggle checked={toggle} onClick={() => setToggle((p) => !p)} />
          <MoonIcon />
        </div>
        <div className={styles.hide}>
          <HideIcon /> Hide Sidebar
        </div>
      </div>
    </aside>
  );
};
