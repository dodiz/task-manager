"use client";

import { useParams } from "next/navigation";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { PlusIcon } from "@/icons/plus-icon";
import { CrossIcon } from "@/icons/cross-icon";
import { Dialog } from "@/ui/dialog";
import { Typography } from "@/ui/typography";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Select } from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { api } from "@/utils/api";
import styles from "./modals.module.scss";

type AddTaskModalProps = {
  show: boolean;
  onHide: () => void;
};

export function AddTaskModal({ show, onHide }: AddTaskModalProps) {
  const { boardId } = useParams();
  const { data: board, refetch: refetchBoard } = api.boards.getById.useQuery({
    id: +boardId,
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
    validationSchema: toFormikValidationSchema(
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
        column: z.object(
          {
            id: z.number(),
            name: z.string(),
          },
          {
            invalid_type_error: "Can't be empty",
          }
        ),
      })
    ),
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
      <form onSubmit={formik.handleSubmit} className={styles.container}>
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
        <div className={styles.columns}>
          <Typography variant="body-sm">Subtasks</Typography>
          {formik.values.subTasks.map((subTask, index) => (
            <div key={index} className={styles.column}>
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
              <CrossIcon
                className={styles.deleteColumn}
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
            <PlusIcon /> Add New SubTask
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
