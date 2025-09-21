import { create } from "zustand";
import { uuidv7 } from "uuidv7";

export interface Board {
  id: string;
  name: string;
  columns: string[];
}

export interface Task {
  boardId: string;
  id: string;
  name: string;
  column: string;
  description: string;
  subTasks: {
    id: string;
    name: string;
    completed: boolean;
  }[];
}

export const useBoardsStore = create<{
  selectedBoard: Board | null;
  selectedTasks: Task[];
  selectBoard: (id: string) => void;
  boards: Record<string, Board>;
  tasks: Record<string, Task>;
  addBoard: (params: { name: string; columns: string[] }) => void;
  editBoard: (params: {
    boardId: string;
    name: string;
    columns: string[];
  }) => void;
  deleteBoard: (boardId: string) => void;
  addTask: (params: {
    boardId: string;
    name: string;
    column: string;
    description: string;
    subTasks: { name: string; completed: boolean }[];
  }) => void;
  editTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, toColumn: string) => void;
  completeSubTask: (
    taskId: string,
    subTaskId: string,
    completed: boolean
  ) => void;
}>((set) => ({
  boards: {},
  tasks: {},
  selectedBoard: null,
  selectedTasks: [],
  selectBoard: (id: string) =>
    set((state) => {
      const selectedBoard = state.boards[id] || null;
      if (!selectedBoard) {
        return {
          selectedBoard: null,
          selectedTasks: [],
        };
      }
      const selectedTasks = Object.values(state.tasks).filter(
        (task) => task.boardId === id
      );
      return {
        selectedBoard,
        selectedTasks,
      };
    }),
  addBoard: ({ name, columns }) => {
    const boardId = uuidv7();
    set((state) => ({
      boards: {
        ...state.boards,
        [boardId]: {
          id: boardId,
          name,
          columns,
        },
      },
    }));
  },
  editBoard: ({ name, columns, boardId }) =>
    set((state) => ({
      boards: {
        ...state.boards,
        [boardId]: {
          id: boardId,
          name,
          columns,
        },
      },
    })),
  deleteBoard: (boardId) =>
    set((state) => {
      const { [boardId]: _, ...remainingBoards } = state.boards;
      return {
        boards: remainingBoards,
      };
    }),
  addTask: ({ boardId, subTasks, ...task }) => {
    const taskId = uuidv7();
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...task,
          id: taskId,
          boardId,
          subTasks: subTasks.map((subTask) => ({
            id: uuidv7(),
            ...subTask,
          })),
        },
      },
    }));
  },
  deleteTask: (taskId) =>
    set((state) => {
      const { [taskId]: _, ...remainingTasks } = state.tasks;
      return {
        tasks: remainingTasks,
      };
    }),
  editTask: (task) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [task.id]: task,
      },
    })),
  moveTask: (taskId, toColumn) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...state.tasks[taskId],
          column: toColumn,
        },
      },
    })),
  completeSubTask: (taskId, subTaskId, completed) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...state.tasks[taskId],
          subTasks: state.tasks[taskId].subTasks.map((subTask) =>
            subTask.id === subTaskId ? { ...subTask, completed } : subTask
          ),
        },
      },
    })),
}));
