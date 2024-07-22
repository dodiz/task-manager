"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { DeleteBoardModal } from "@/components/modals/delete-board-modal";
import { EditBoardModal } from "@/components/modals/edit-board-modal";
import { AddTaskModal } from "@/components/modals/add-task-modal";
import { useTheme } from "@/hooks/useTheme";
import { LogoMobile } from "@/icons/logo-mobile";
import { Logo } from "@/icons/logo";
import { ArrowDownIcon } from "@/icons/arrow-down-icon";
import { Button } from "@/ui/button";
import { Typography } from "@/ui/typography";
import { Dropdown } from "@/ui/dropdown";
import { PlusIcon } from "@/icons/plus-icon";
import { api } from "@/utils/api";

export function Header() {
  const { isSidebarHidden, toggleSidebarMobile } = useTheme();
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
      <header className="flex items-center border-b-[.1rem] p-4 gap-2 tablet:py-8 tablet:px-6 bg-light-100 justify-between dark:bg-dark-200 dark:border-dark-100">
        <div className="tablet:flex hidden gap-5 items-center">
          {isSidebarHidden ? (
            <Logo className="dark:text-white text-[#000112]" />
          ) : null}
          <Typography variant="title-xl">
            {board?.name || "Select a board"}
          </Typography>
        </div>
        <div
          className="flex items-center gap-4 tablet:hidden"
          onClick={toggleSidebarMobile}
        >
          <LogoMobile />
          <Typography
            variant="title-l"
            className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[13rem]"
          >
            {board?.name || "Select a board"}{" "}
          </Typography>
          <ArrowDownIcon />
        </div>
        <div className="flex items-center gap-3 tablet:gap-4">
          <Button
            variant="primary-large"
            disabled={!board}
            onClick={() => setIsAddingTask(true)}
          >
            <PlusIcon /> <div className="hidden tablet:block">Add New Task</div>
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
}
