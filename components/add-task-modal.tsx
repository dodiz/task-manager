"use client";

import { XIcon, PlusIcon } from "lucide-react";
import { z } from "zod";
import { Dialog } from "@/ui/dialog";
import { Typography } from "@/ui/typography";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Select } from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBoardsStore } from "@/hooks/use-boards-store";

type AddTaskModalProps = {
  show: boolean;
  onHide: () => void;
  boardId: string;
};

export function AddTaskModal({ show, onHide, boardId }: AddTaskModalProps) {
  const { addTask, selectedBoard: board } = useBoardsStore();
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      subTasks: [""],
      column: "",
    },
    resolver: zodResolver(
      z.object({
        name: z.string({
          required_error: "Can't be empty",
        }),
        description: z.string().optional(),
        subTasks: z.array(
          z.string({
            required_error: "Can't be empty",
          })
        ),
        column: z.string(),
      })
    ),
  });

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <form
        onSubmit={handleSubmit(({ name, description, subTasks, column }) =>
          addTask({
            boardId,
            name,
            description: description || "",
            subTasks: [],
            column,
          })
        )}
        className="flex flex-col gap-6"
      >
        <Typography variant="title-l">Add Task</Typography>
        <Input
          label="Title"
          {...register("name")}
          placeholder="e.g. Groceries"
          error={errors.name?.message}
        />
        <Textarea
          label="Description"
          placeholder="e.g. Design a website for a client"
          {...register("description")}
        />
        <div className="flex flex-col gap-3">
          <Typography variant="body-sm">Subtasks</Typography>
          {watch("subTasks").map((subTask, index) => (
            <div key={index} className="flex items-center gap-4">
              <Input
                value={subTask}
                placeholder="e.g. Todo"
                {...register(`subTasks.${index}`)}
                error={errors?.subTasks?.[index]?.message}
              />
              <XIcon
                className="cursor-pointer text-light-400 size-9 hover:fill-accent-200"
                onClick={() => {
                  setValue(
                    "subTasks",
                    getValues("subTasks").filter((_, i) => i !== index)
                  );
                }}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() => setValue("subTasks", [...watch("subTasks"), ""])}
          >
            <PlusIcon /> Add New SubTask
          </Button>
          {board?.columns && (
            <Select
              items={board.columns}
              placeholder="Select a status"
              label="Status"
              onSelect={(column) => setValue("column", column)}
              error={errors.column?.message}
              selected={watch("column")}
            />
          )}
        </div>
        <Button>Create Task</Button>
      </form>
    </Dialog>
  );
}
