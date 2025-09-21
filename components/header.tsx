"use client";

import { use, useState } from "react";
import { PlusIcon, ChevronDown } from "lucide-react";
import { DeleteBoardModal } from "@/components/delete-board-modal";
import { EditBoardModal } from "@/components/edit-board-modal";
import { AddTaskModal } from "@/components/add-task-modal";
import { Logo } from "@/components/logo";
import { SidebarContext } from "@/app/sidebar-provider";
import { Button } from "@/ui/button";
import { Typography } from "@/ui/typography";
import { DropdownMenu } from "@/ui/dropdown-menu";
import { useBoardsStore } from "@/hooks/use-boards-store";

export function Header() {
  const { toggleSidebarMobile } = use(SidebarContext);
  const { selectedBoard } = useBoardsStore();
  const board = selectedBoard!;
  const [isDeletingBoard, setIsDeletingBoard] = useState(false);
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  return (
    <>
      {isDeletingBoard && (
        <DeleteBoardModal
          boardId={board.id}
          show={isDeletingBoard}
          onHide={() => setIsDeletingBoard(false)}
        />
      )}
      {isEditingBoard && (
        <EditBoardModal
          boardId={board.id}
          show={isEditingBoard}
          onHide={() => setIsEditingBoard(false)}
        />
      )}
      {isAddingTask && (
        <AddTaskModal
          boardId={board.id}
          show={isAddingTask}
          onHide={() => setIsAddingTask(false)}
        />
      )}
      <header className="flex items-center border-b-[.1rem] p-4 gap-2 tablet:py-8 tablet:px-6 bg-light-100 justify-between dark:bg-dark-200 dark:border-dark-100">
        <div className="tablet:flex hidden gap-5 items-center">
          <Logo />
          <Typography variant="title-xl">
            {board?.name || "Select a board"}
          </Typography>
        </div>
        <div
          className="flex items-center gap-4 tablet:hidden cursor-pointer"
          onClick={toggleSidebarMobile}
        >
          <Logo />
          <Typography
            variant="title-l"
            className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[13rem]"
          >
            {board?.name || "Select a board"}
          </Typography>
          <ChevronDown className="w-5 text-primary-200" />
        </div>
        <div className="flex items-center gap-3 tablet:gap-4">
          <Button
            variant="primary"
            size="large"
            disabled={!board}
            onClick={() => setIsAddingTask(true)}
            className="flex items-center justify-center"
          >
            <PlusIcon />
            <div className="hidden tablet:block">Add New Task</div>
          </Button>
          {board && (
            <DropdownMenu
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
}
