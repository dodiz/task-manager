"use client";

import { z } from "zod";
import { RiAddFill, RiCloseLine } from "@remixicon/react";
import { Task } from "@/server/types";
import { Dialog } from "@/ui/dialog";
import { Typography } from "@/ui/typography";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Textarea } from "@/ui/textarea";
import { api } from "@/utils/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type EditTaskModalProps = {
  task: Task;
  onTaskUpdate: () => void;
  show: boolean;
  onHide: () => void;
};

export function EditTaskModal({
  show,
  task,
  onHide,
  onTaskUpdate,
}: EditTaskModalProps) {
  const { mutate: editTask } = api.tasks.update.useMutation({
    onSuccess: onTaskUpdate,
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: task.name,
      description: task.description ?? "",
      prevSubTasks: task.subTasks.map((subTask) => ({
        name: subTask.name,
        id: subTask.id,
        action: "update" as "update" | "delete",
      })),
      newSubTasks: [] as string[],
    },
    resolver: zodResolver(
      z.object({
        name: z.string({
          required_error: "Can't be empty",
        }),
        description: z.string().optional(),
        prevSubTasks: z.array(
          z.object({
            name: z.string({
              required_error: "Can't be empty",
            }),
            action: z.enum(["delete", "update"]),
            id: z.number(),
          })
        ),
        newSubTasks: z.array(
          z.string({
            required_error: "Can't be empty",
          })
        ),
      })
    ),
  });

  return (
    <Dialog show={show} onHide={onHide}>
      <form
        onSubmit={handleSubmit(
          ({ name, newSubTasks, description, prevSubTasks }) =>
            editTask({
              id: task.id,
              name,
              description: description || "",
              newSubTasks,
              prevSubTasks,
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
          {watch("prevSubTasks").map(
            (subTask, index) =>
              subTask.action !== "delete" && (
                <div key={index} className="flex items-center gap-4">
                  <Input
                    value={subTask.name}
                    placeholder="e.g. Todo"
                    {...register(`prevSubTasks.${index}.name`)}
                    error={errors.prevSubTasks?.[index]?.message}
                  />
                  <RiCloseLine
                    className="cursor-pointer text-light-400 size-9 hover:fill-accent-200"
                    onClick={() => {
                      setValue(
                        "prevSubTasks",
                        watch("prevSubTasks").map((subTask, i) =>
                          i === index
                            ? { ...subTask, action: "delete" }
                            : subTask
                        )
                      );
                    }}
                  />
                </div>
              )
          )}
          {watch("newSubTasks").map((subTask, index) => (
            <div key={index} className="flex items-center gap-4">
              <Input
                value={subTask}
                placeholder="e.g. Todo"
                {...register(`newSubTasks.${index}`)}
                error={errors.newSubTasks?.[index]?.message}
              />
              <RiCloseLine
                className="cursor-pointer text-light-400 size-9 hover:fill-accent-200"
                onClick={() => {
                  setValue(
                    "newSubTasks",
                    watch("newSubTasks").filter((_, i) => i !== index)
                  );
                }}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              setValue("newSubTasks", [...watch("newSubTasks"), ""])
            }
          >
            <RiAddFill /> Add New Subtask
          </Button>
          <Button>Save Changes</Button>
        </div>
      </form>
    </Dialog>
  );
}
