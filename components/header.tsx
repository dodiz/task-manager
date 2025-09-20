"use client";

import { use, useState } from "react";
import { useParams } from "next/navigation";
import { RiAddFill, RiArrowDownSLine } from "@remixicon/react";
import { DeleteBoardModal } from "@/components/delete-board-modal";
import { EditBoardModal } from "@/components/edit-board-modal";
import { AddTaskModal } from "@/components/add-task-modal";
import { Logo } from "@/components/logo";
import { SidebarContext } from "@/providers/sidebar-provider";
import { Button } from "@/ui/button";
import { Typography } from "@/ui/typography";
import { DropdownMenu } from "@/ui/dropdown-menu";
import { api } from "@/utils/api";

export function Header() {
  const { toggleSidebarMobile } = use(SidebarContext);
  const [isDeletingBoard, setIsDeletingBoard] = useState(false);
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { boardId } = useParams();
  const { data: board } = api.boards.getById.useQuery(
    { id: +boardId! },
    { enabled: !!boardId }
  );
  return (
    <>
      {isDeletingBoard && (
        <DeleteBoardModal
          boardId={+boardId!}
          show={isDeletingBoard}
          onHide={() => setIsDeletingBoard(false)}
        />
      )}
      {isEditingBoard && (
        <EditBoardModal
          boardId={+boardId!}
          show={isEditingBoard}
          onHide={() => setIsEditingBoard(false)}
        />
      )}
      {isAddingTask && (
        <AddTaskModal
          boardId={+boardId!}
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
            {board?.name || "Select a board"}{" "}
          </Typography>
          <RiArrowDownSLine className="w-5 text-primary-200" />
        </div>
        <div className="flex items-center gap-3 tablet:gap-4">
          <Button
            variant="primary"
            size="large"
            disabled={!board}
            onClick={() => setIsAddingTask(true)}
            className="flex items-center justify-center"
          >
            <RiAddFill />
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
