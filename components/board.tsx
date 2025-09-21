"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";
import { PlusIcon } from "lucide-react";
import { ViewTaskModal } from "@/components/view-task-modal";
import { EditTaskModal } from "@/components/edit-task-modal";
import { DeleteTaskModal } from "@/components/delete-task-modal";
import { Typography } from "@/ui/typography";
import { Button } from "@/ui/button";
import { useBoardsStore, type Task } from "@/hooks/use-boards-store";

export function Board() {
  const { selectedBoard, selectedTasks, moveTask } = useBoardsStore();
  const board = selectedBoard!;

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [droppingColumnId, setDroppingColumnId] = useState<string | null>(null);

  const selectedTask =
    Object.values(selectedTasks).find((t) => t.id === selectedTaskId) || null;

  if (!board)
    return (
      <div className="flex flex-col gap-4 w-full items-center justify-center dark:bg-dark-300 h-full">
        <Typography variant="title-l">Something went wrong.</Typography>
        <Typography variant="body">No board was found this id.</Typography>
      </div>
    );

  return (
    <>
      {selectedTask && (
        <ViewTaskModal
          board={board}
          onTaskDelete={() => {
            setDeletingTaskId(selectedTask.id);
            setSelectedTaskId(null);
          }}
          onTaskEdit={() => {
            setEditingTask(selectedTask);
            setSelectedTaskId(null);
          }}
          show={!!selectedTask}
          onHide={() => setSelectedTaskId(null)}
          task={selectedTask}
        />
      )}
      {editingTask && (
        <EditTaskModal
          show={!!editingTask}
          onHide={() => setEditingTask(null)}
          task={editingTask}
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
                key={column}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDroppingColumnId(column);
                }}
                onDragLeave={() => setDroppingColumnId(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  const taskId = e.dataTransfer.getData("taskId");
                  moveTask(taskId, column);
                  setDroppingColumnId(null);
                }}
                className={cn(
                  "w-[28rem] flex flex-col gap-6 transition-all",
                  droppingColumnId === column && "p-1 rounded-xl shadow-2xl"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full",
                      i % 3 === 0
                        ? "bg-accent-100"
                        : i % 2 === 0
                          ? "bg-green-400"
                          : "bg-yellow-200"
                    )}
                  />
                  <Typography variant="title-s">
                    {column.toUpperCase()} (
                    {selectedTasks.filter((t) => t.column === column).length})
                  </Typography>
                </div>
                <div className="flex flex-col gap-5">
                  {selectedTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("taskId", task.id);
                      }}
                      onClick={() => setSelectedTaskId(task.id)}
                      className="py-6 px-4 rounded-xl bg-light-100 flex flex-col gap-2 cursor-pointer dark:bg-dark-200"
                    >
                      <Typography variant="title-m">{task.name}</Typography>
                      <Typography variant="body">
                        {task.subTasks.length === 0
                          ? "No subtasks"
                          : `${task.subTasks.filter((t) => t.completed).length} of ${task.subTasks.length} subtasks`}
                      </Typography>
                    </div>
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
                <PlusIcon /> Add New Column
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
