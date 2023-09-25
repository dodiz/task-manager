import { FC, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import classNames from "classnames";
import { AddBoardModal } from "@/components";
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
  const { boardId } = useParams();
  const { data: boards, isError } = api.boards.getAll.useQuery();
  const {
    isDark,
    toggleTheme,
    toggleSidebar,
    isSidebarHidden,
    showSidebarMobile,
    toggleSidebarMobile,
  } = useTheme();
  const [showAddBoard, setShowAddBoard] = useState(false);

  return (
    <>
      <div
        className={classNames(
          styles.backdrop,
          showSidebarMobile && styles.show
        )}
        onClick={toggleSidebarMobile}
      />
      {showAddBoard && (
        <AddBoardModal
          show={showAddBoard}
          onHide={() => setShowAddBoard(false)}
        />
      )}
      <aside
        className={classNames(
          styles.container,
          isDark && styles.dark,
          isSidebarHidden && styles.hidden,
          showSidebarMobile && styles.showMobile
        )}
      >
        <div>
          <div className={styles.logo}>
            {isDark ? (
              <LogoDark className={styles.logoImage} />
            ) : (
              <LogoLight className={styles.logoImage} />
            )}
          </div>
          <div className={styles.boardTitle}>
            <Typography variant="title-s">
              ALL BOARDS ({boards?.length})
            </Typography>
          </div>
          <div className={styles.boards}>
            {boards &&
              boards.map((board) => (
                <Link
                  href={`/${board.id}`}
                  key={board.id}
                  className={classNames(
                    styles.board,
                    +boardId === board.id && styles.active
                  )}
                >
                  <BoardIcon /> {board.name}
                </Link>
              ))}
            <div
              onClick={() => !isError && setShowAddBoard(true)}
              className={classNames(
                styles.board,
                styles.newBoard,
                isError && styles.disabled
              )}
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
