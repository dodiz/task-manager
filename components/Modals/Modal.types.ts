import { Column, Task } from "@/server/types";

export type ModalProps = {
  show: boolean;
  onHide: () => void;
};

export type ViewTaskModalProps = ModalProps & {
  task: Task;
  columns: Column[];
  selectedColumn: Column | null;
  onTaskUpdate: () => void;
  onTaskDelete: () => void;
  onTaskEdit: () => void;
};

export type EditTaskModalProps = ModalProps & {
  task: Task;
  onTaskUpdate: () => void;
};
