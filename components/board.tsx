"use client";

import { FC, useState } from "react";
import classNames from "classnames";
import { RiAddFill, RiLoader4Fill } from "@remixicon/react";
import { Column, Task } from "@/server/types";
import { ViewTaskModal } from "@/components/view-task-modal";
import { EditTaskModal } from "@/components/edit-task-modal";
import { DeleteTaskModal } from "@/components/delete-task-modal";
import { Typography } from "@/ui/typography";
import { Button } from "@/ui/button";
import { api } from "@/utils/api";
import { TaskCard } from "@/components/task-card";

type BoardProps = {
  boardId: number;
};

export const Board: FC<BoardProps> = ({ boardId }) => {
  const {
    data: board,
    isLoading,
    isError,
    refetch,
  } = api.boards.getById.useQuery({ id: boardId });
  const { mutate: moveTask } = api.tasks.move.useMutation({
    onSuccess: refetch,
  });

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [droppingColumn, setDroppingColumn] = useState<Column | null>(null);

  const selectedTask =
    board?.columns
      .flatMap((c) => c.tasks)
      .find((t) => t.id === selectedTaskId) || null;

  const selectedColumn =
    board?.columns.find((c) => selectedTask?.columnId === c.id) || null;

  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center dark:bg-dark-300 h-full">
        <RiLoader4Fill className="animate-spin text-primary-200 size-10" />
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col gap-4 w-full items-center justify-center dark:bg-dark-300 h-full">
        <Typography variant="title-l">Something went wrong.</Typography>
        <Typography variant="body">
          No board was found with id "{boardId}".
        </Typography>
        <Typography variant="body">Database might be offline.</Typography>
      </div>
    );

  return (
    <>
      {selectedTask && (
        <ViewTaskModal
          onTaskDelete={() => {
            setDeletingTaskId(selectedTask.id);
            setSelectedTaskId(null);
          }}
          onTaskEdit={() => {
            setEditingTask(selectedTask);
            setSelectedTaskId(null);
          }}
          columns={board?.columns || []}
          selectedColumn={selectedColumn}
          show={!!selectedTask}
          onHide={() => setSelectedTaskId(null)}
          task={selectedTask}
          onTaskUpdate={refetch}
        />
      )}
      {editingTask && (
        <EditTaskModal
          show={!!editingTask}
          onHide={() => setEditingTask(null)}
          task={editingTask}
          onTaskUpdate={() => {
            setEditingTask(null);
            refetch();
          }}
        />
      )}
      {deletingTaskId && (
        <DeleteTaskModal
          show={!!deletingTaskId}
          onHide={() => setDeletingTaskId(null)}
          taskId={deletingTaskId}
        />
      )}
      <div className="min-w-full w-max-content overflow-auto bg-light-200 h-full dark:bg-dark-300">
        {board!.columns.length ? (
          <div className="flex gap-6 p-8">
            {board!.columns.map((column, i) => (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDroppingColumn(column);
                }}
                onDragLeave={() => setDroppingColumn(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  const taskId = +e.dataTransfer.getData("taskId");
                  moveTask({
                    taskId,
                    columnId: column.id,
                  });
                  setDroppingColumn(null);
                }}
                key={column.id}
                className={classNames(
                  "w-[28rem] flex flex-col gap-6 transition-all",
                  droppingColumn === column && "p-1 rounded-xl shadow-2xl"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={classNames(
                      "w-4 h-4 rounded-full",
                      i % 3 === 0
                        ? "bg-accent-100"
                        : i % 2 === 0
                          ? "bg-green-400"
                          : "bg-yellow-200"
                    )}
                  />
                  <Typography variant="title-s">
                    {column.name?.toUpperCase()} ({column.tasks.length})
                  </Typography>
                </div>
                <div className="flex flex-col gap-5">
                  {column.tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      id={task.id}
                      onClick={() => setSelectedTaskId(task.id)}
                      label={task.name}
                      subCompleted={
                        task.subTasks.filter((t) => t.completed).length
                      }
                      subTotal={task.subTasks.length}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-8 items-center justify-center h-full">
            <Typography variant="title-l">
              The board is empty. Create a new column to get started.
            </Typography>
            <div className="flex justify-center">
              <Button>
                <RiAddFill /> Add New Column
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
