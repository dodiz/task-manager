import { Task } from "@/server/types";

export type ModalProps = {
  show: boolean;
  onHide: () => void;
};

export type ViewTaskModalProps = ModalProps & {
  task: Task;
  onTaskUpdate: () => void;
};
