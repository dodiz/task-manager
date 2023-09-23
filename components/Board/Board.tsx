import { FC, useMemo, useState } from "react";
import classNames from "classnames";
import { Column } from "@/server/types";
import { useTheme } from "@/hooks";
import { Button, LoadingSpinner, PlusIcon, Typography } from "@/ui";
import { api } from "@/utils/api";
import { BoardProps } from "./Board.types";
import { TaskCard } from "./TaskCard";
import styles from "./Board.module.scss";
import { ViewTaskModal } from "@/components";

export const Board: FC<BoardProps> = ({ boardId }) => {
  const { isDark } = useTheme();
  const {
    data: board,
    isLoading,
    isError,
    refetch,
  } = api.boards.getById.useQuery({ id: boardId }, { enabled: !!boardId });
  const { mutate: moveTask } = api.tasks.move.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [droppingColumn, setDroppingColumn] = useState<Column | null>(null);
  const selectedTask = useMemo(() => {
    if (!selectedTaskId) return null;
    const task = board?.columns
      .flatMap((c) => c.tasks)
      .find((t) => t.id === selectedTaskId);
    return task;
  }, [board, selectedTaskId]);

  const columns = useMemo(() => {
    return board?.columns || [];
  }, [board]);

  const selectedColumn = useMemo(() => {
    if (!board || !selectedTask) return null;
    return board.columns.find((c) => selectedTask.columnId === c.id) || null;
  }, [selectedTask, board]);

  if (isLoading) {
    return (
      <div className={classNames(styles.loadingWrapper, isDark && styles.dark)}>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={classNames(styles.errorWrapper, isDark && styles.dark)}>
        <Typography variant="title-l">Something went wrong.</Typography>
        <Typography variant="body">
          No board was found with id "{boardId}"
        </Typography>
      </div>
    );
  }
  return (
    <>
      {selectedTask && (
        <ViewTaskModal
          columns={columns}
          selectedColumn={selectedColumn}
          show={!!selectedTask}
          onHide={() => setSelectedTaskId(null)}
          task={selectedTask}
          onTaskUpdate={refetch}
        />
      )}
      <div className={classNames(styles.wrapper, isDark && styles.dark)}>
        {board!.columns.length ? (
          <div className={styles.columns}>
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
                  styles.column,
                  droppingColumn === column && styles.dropping
                )}
              >
                <div className={styles.columnHeader}>
                  <div
                    className={classNames(
                      styles.columnDot,
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
                <div className={styles.tasks}>
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
          <div className={styles.empty}>
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
};
