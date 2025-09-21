"use client";

import { z } from "zod";
import { PlusIcon, XIcon } from "lucide-react";
import { Dialog } from "@/ui/dialog";
import { Typography } from "@/ui/typography";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Textarea } from "@/ui/textarea";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBoardsStore, type Task } from "@/hooks/use-boards-store";
import { uuidv7 } from "uuidv7";

type EditTaskModalProps = {
  task: Task;
  show: boolean;
  onHide: () => void;
};

const schema = z.object({
  name: z.string({
    required_error: "Can't be empty",
  }),
  description: z.string().optional(),
  subTasks: z.array(
    z.object({
      id: z.string(),
      name: z.string({
        required_error: "Can't be empty",
      }),
      completed: z.boolean(),
    })
  ),
});

export function EditTaskModal({ show, task, onHide }: EditTaskModalProps) {
  const { editTask } = useBoardsStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: task.name,
      description: task.description ?? "",
      subTasks: task.subTasks,
    },
    resolver: zodResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subTasks",
  });

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <form
        onSubmit={handleSubmit(({ name, description, subTasks }) =>
          editTask({
            id: task.id,
            boardId: task.boardId,
            column: task.column,
            name,
            description: description || "",
            subTasks,
          })
        )}
        className="flex flex-col gap-6"
      >
        <Typography variant="title-l">Edit Task</Typography>
        <Input
          label="Title"
          placeholder="e.g. Groceries"
          {...register("name")}
          error={errors.name?.message}
        />
        <Textarea
          label="Description"
          placeholder="e.g. It's always good to take a break. This 15 minute break will
          recharge the batteries a little."
          {...register("description")}
          error={errors.description?.message}
        />
        <div className="flex flex-col gap-3">
          <Typography variant="body-sm">SubTasks</Typography>
          {fields.map((subTask, index) => (
            <div key={index} className="flex items-center gap-4">
              <Input
                value={subTask.name}
                placeholder="e.g. Todo"
                {...register(`subTasks.${index}.name`)}
                error={errors.subTasks?.[index]?.name?.message}
              />
              <XIcon
                className="cursor-pointer text-light-400 size-9 hover:fill-accent-200"
                onClick={() => remove(index)}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ id: uuidv7(), name: "", completed: false })}
          >
            <PlusIcon /> Add New Subtask
          </Button>
          <Button>Save Changes</Button>
        </div>
      </form>
    </Dialog>
  );
}
