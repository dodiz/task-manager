"use client";

import { RiAddFill, RiCloseLine } from "@remixicon/react";
import { z } from "zod";
import { Dialog } from "@/ui/dialog";
import { Typography } from "@/ui/typography";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Select } from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { api } from "@/utils/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type AddTaskModalProps = {
  show: boolean;
  onHide: () => void;
  boardId: number;
};

export function AddTaskModal({ show, onHide, boardId }: AddTaskModalProps) {
  const { data: board, refetch: refetchBoard } = api.boards.getById.useQuery({
    id: boardId,
  });
  const addTask = api.tasks.add.useMutation({
    onSuccess: () => {
      refetchBoard();
      onHide();
    },
  });
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      subTasks: [""],
      column: null as {
        id: number;
        name: string;
      } | null,
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
        column: z
          .object(
            {
              id: z.number(),
              name: z.string(),
            },
            {
              invalid_type_error: "Can't be empty",
            }
          )
          .nullable(),
      })
    ),
  });

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <form
        onSubmit={handleSubmit(({ name, description, subTasks, column }) =>
          addTask.mutate({
            name,
            description: description || "",
            subTasks,
            columnId: column!.id,
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
              <RiCloseLine
                className="cursor-pointer text-light-400 size-9 hover:fill-accent-200"
                onClick={() => {
                  setValue(
                    "subTasks",
                    watch("subTasks").filter((_, i) => i !== index)
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
            <RiAddFill /> Add New SubTask
          </Button>
          {board?.columns && (
            <Select
              items={board.columns}
              valueField="id"
              labelField={(item) => item.name}
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
