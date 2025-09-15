"use client";

import { useFormik } from "formik";
import { RiAddFill, RiCloseLine } from "@remixicon/react";
import { z } from "zod";
import { Dialog } from "@/ui/dialog";
import { Typography } from "@/ui/typography";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Select } from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { api } from "@/utils/api";

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
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      subTasks: [""],
      column: null as {
        id: number;
        name: string;
      } | null,
    },
    validationSchema: z.object({
      name: z.string({
        required_error: "Can't be empty",
      }),
      description: z.string().optional(),
      subTasks: z.array(
        z.string({
          required_error: "Can't be empty",
        })
      ),
      column: z.object(
        {
          id: z.number(),
          name: z.string(),
        },
        {
          invalid_type_error: "Can't be empty",
        }
      ),
    }),
    onSubmit: ({ name, description, subTasks, column }) =>
      addTask.mutate({
        name,
        description,
        subTasks,
        columnId: column!.id,
      }),
  });

  return (
    <Dialog show={show} onHide={onHide}>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        <Typography variant="title-l">Add Task</Typography>
        <Input
          label="Title"
          name="name"
          value={formik.values.name}
          placeholder="e.g. Groceries"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name ? formik.errors.name : ""}
        />
        <Textarea
          name="description"
          value={formik.values.description}
          label="Description"
          placeholder="e.g. Design a website for a client"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="flex flex-col gap-3">
          <Typography variant="body-sm">Subtasks</Typography>
          {formik.values.subTasks.map((subTask, index) => (
            <div key={index} className="flex items-center gap-4">
              <Input
                name={`subTasks.${index}`}
                value={subTask}
                placeholder="e.g. Todo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  (formik.touched.subTasks as boolean[] | undefined)?.[index]
                    ? formik.errors.subTasks?.[index]
                    : ""
                }
              />
              <RiCloseLine
                className="cursor-pointer text-light-400 size-9 hover:fill-accent-200"
                onClick={() => {
                  formik.setFieldValue(
                    "subTasks",
                    formik.values.subTasks.filter((_, i) => i !== index)
                  );
                }}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              formik.setFieldValue("subTasks", [...formik.values.subTasks, ""])
            }
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
              onSelect={(column) => {
                formik.setFieldValue("column", column);
              }}
              error={formik.touched.column ? formik.errors.column : ""}
              selected={formik.values.column}
            />
          )}
        </div>
        <Button>Create Task</Button>
      </form>
    </Dialog>
  );
}
