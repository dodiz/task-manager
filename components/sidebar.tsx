"use client";

import { use } from "react";
import { cn } from "@/utils/cn";
import { KanbanSquare, EyeClosed, Eye } from "lucide-react";
import { AddBoardModal } from "@/components/add-board-modal";
import { ToggleTheme } from "@/components/toggle-theme";
import { SidebarContext } from "@/app/sidebar-provider";
import { Typography } from "@/ui/typography";
import { useBoardsStore } from "@/hooks/use-boards-store";

export function Sidebar() {
  const { boards, selectedBoard, selectBoard } = useBoardsStore();
  const {
    toggleSidebar,
    showSidebarDesktop,
    showSidebarMobile,
    toggleSidebarMobile,
  } = use(SidebarContext);

  return (
    <>
      <div
        aria-hidden={!showSidebarMobile}
        className="block aria-hidden:hidden fixed top-0 left-0 w-full h-full bg-black/60 tablet:hidden"
        onClick={toggleSidebarMobile}
      />
      <aside
        className={cn(
          "fixed rounded-xl top-[12rem] w-[26rem] left-1/2 flex-col justify-between bg-light-100 tablet:z-10 tablet:opacity-100 tablet:h-screen tablet:left-0 tablet:top-0 tablet:transform-none tablet:rounded-none tablet:border-r-[.1rem] tablet:border-r-light-300 tablet:flex desktop:w-[30rem] dark:bg-dark-200 dark:border-dark-100",
          showSidebarMobile ? "opacity-100 z-10" : "opacity-0 -z-10",
          showSidebarDesktop ? "tablet:sticky" : "tablet:hidden"
        )}
        style={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div>
          <div className="ml-6 mt-4 tablet:ml-8 tablet:mt-13">
            <Typography variant="title-s" className="text-[2rem] uppercase">
              My boards ({Object.keys(boards).length})
            </Typography>
          </div>
          <div className="mt-5 flex flex-col mr-6">
            {Object.values(boards).map((board) => (
              <span
                onClick={() => selectBoard(board.id)}
                key={board.id}
                className={cn(
                  "transition-all flex items-center gap-4 py-4 pl-8 cursor-pointer text-base font-bold rounded-r-[10rem]",
                  selectedBoard?.id === board.id
                    ? "bg-primary-200 text-light-200"
                    : "text-light-400"
                )}
              >
                <KanbanSquare className="size-5" /> {board.name}
              </span>
            ))}

            <AddBoardModal />
          </div>
        </div>
        <div>
          <ToggleTheme />
          <div
            className="hidden items-center gap-4 text-light-400 text-base font-bold m-6 mb-9 cursor-pointer tablet:flex"
            onClick={() => toggleSidebar()}
          >
            <EyeClosed className="size-5" />
            Hide Sidebar
          </div>
        </div>
      </aside>
      <div
        className={cn(
          "hidden fixed bottom-6 left-0 bg-primary-200 rounded-r-[5rem] cursor-pointer py-5 px-6",
          showSidebarDesktop ? "tablet:hidden" : "tablet:block"
        )}
        onClick={toggleSidebar}
      >
        <Eye className="size-5" />
      </div>
    </>
  );
}
