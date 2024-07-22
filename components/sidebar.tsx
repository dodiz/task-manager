"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import classNames from "classnames";
import { useTheme } from "@/hooks/useTheme";
import { AddBoardModal } from "@/components/modals/add-board-modal";
import { BoardIcon } from "@/icons/board-icon";
import { HideIcon } from "@/icons/hide-icon";
import { Logo } from "@/icons/logo";
import { MoonIcon } from "@/icons/moon-icon";
import { PlusIcon } from "@/icons/plus-icon";
import { ShowIcon } from "@/icons/show-icon";
import { SunIcon } from "@/icons/sun-icon";
import { Toggle } from "@/ui/toggle";
import { Typography } from "@/ui/typography";
import { api } from "@/utils/api";
import { useTheme as useNextTheme } from "next-themes";

export function Sidebar() {
  const { toggleTheme } = useTheme();
  const {
    theme: nextTheme,
    setTheme: setNextTheme,
    systemTheme,
  } = useNextTheme();
  const theme = nextTheme === "system" ? systemTheme : nextTheme;

  const { boardId } = useParams();
  const { data: boards, isError } = api.boards.getAll.useQuery();
  const {
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
          "fixed top-0 left-0 w-full h-full bg-black/60 tablet:hidden",
          showSidebarMobile ? "block" : "hidden"
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
          "fixed rounded-xl top-[12rem] w-[26rem] left-1/2 -translate-x-1/2 -z-10 flex-col justify-between bg-light-100 opacity-0 tablet:z-10 tablet:opacity-100 tablet:h-screen tablet:sticky tablet:left-0 tablet:top-0 tablet:transform-none tablet:rounded-none tablet:border-r-[.1rem] tablet:border-r-light-300 tablet:flex desktop:w-[30rem] dark:bg-dark-200 dark:border-dark-100",
          showSidebarMobile && "opacity-100 z-10",
          isSidebarHidden && "tablet:hidden"
        )}
        style={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1);",
        }}
      >
        <div>
          <Logo className="dark:fill-white fill-[#000112] hidden tablet:block mt-8 ml-8" />
          <div className="ml-6 mt-4 tablet:ml-8 tablet:mt-13">
            <Typography variant="title-s">
              ALL BOARDS ({boards?.length})
            </Typography>
          </div>
          <div className="mt-5 flex flex-col mr-6">
            {boards &&
              boards.map((board) => (
                <Link
                  href={`/${board.id}`}
                  key={board.id}
                  className={classNames(
                    "transition-all flex items-center gap-4 py-4 pl-8 cursor-pointer text-base font-bold rounded-r-[10rem]",
                    +boardId === board.id
                      ? "bg-primary-200 text-light-200"
                      : "text-light-400"
                  )}
                >
                  <BoardIcon /> {board.name}
                </Link>
              ))}
            <div
              onClick={() => !isError && setShowAddBoard(true)}
              className={classNames(
                "transition-all flex items-center gap-4 py-4 pl-8 cursor-pointer text-base font-bold rounded-r-[10rem] text-primary-200",
                isError && "opacity-50 cursor-not-allowed"
              )}
            >
              <BoardIcon />
              <div className="flex items-center gap-2">
                <PlusIcon /> Create new board
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="m-6 flex p-4 justify-center items-center gap-6 bg-light-200 rounded-lg dark:bg-dark-300">
            <SunIcon />
            <Toggle
              checked={theme === "dark"}
              onClick={() => {
                toggleTheme();
                setNextTheme(theme === "dark" ? "light" : "dark");
              }}
            />
            <MoonIcon />
          </div>
          <div
            className="hidden items-center gap-4 text-light-400 text-base font-bold m-6 mb-9 cursor-pointer tablet:flex"
            onClick={toggleSidebar}
          >
            <HideIcon /> Hide Sidebar
          </div>
        </div>
      </aside>
      <div
        className={classNames(
          "hidden fixed bottom-6 left-0 bg-primary-200 rounded-r-[5rem] cursor-pointer py-5 px-6",
          !isSidebarHidden ? "tablet:hidden" : "tablet:block"
        )}
        onClick={toggleSidebar}
      >
        <ShowIcon />
      </div>
    </>
  );
}
