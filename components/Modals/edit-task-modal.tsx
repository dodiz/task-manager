"use client";

import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { Task } from "@/server/types";
import { PlusIcon } from "@/icons/plus-icon";
import { CrossIcon } from "@/icons/cross-icon";
import { Dialog } from "@/ui/dialog";
import { Typography } from "@/ui/typography";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Textarea } from "@/ui/textarea";
import { api } from "@/utils/api";
import styles from "./modals.module.scss";

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
  const formik = useFormik({
    initialValues: {
      name: task.name,
      description: task.description ?? "",
      prevSubTasks: task.subTasks.map((subTask) => ({
        name: subTask.name,
        id: subTask.id,
        action: "update" as "update" | "delete",
      })),
      newSubTasks: [] as string[],
    },
    validationSchema: toFormikValidationSchema(
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
    onSubmit: (values) => {
      editTask({ id: task.id, ...values });
    },
  });

  return (
    <Dialog show={show} onHide={onHide}>
      <form onSubmit={formik.handleSubmit} className={styles.container}>
        <Typography variant="title-l">Edit Task</Typography>
        <Input
          name="name"
          value={formik.values.name}
          label="Title"
          placeholder="e.g. Groceries"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name ? formik.errors.name : ""}
        />
        <Textarea
          name="description"
          value={formik.values.description}
          label="Description"
          placeholder="e.g. It's always good to take a break. This 15 minute break will
          recharge the batteries a little."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description ? formik.errors.description : ""}
        />
        <div className={styles.columns}>
          <Typography variant="body-sm">SubTasks</Typography>
          {formik.values.prevSubTasks.map(
            (subTask, index) =>
              subTask.action !== "delete" && (
                <div key={index} className={styles.column}>
                  <Input
                    name={`prevSubTasks.${index}.name`}
                    value={subTask.name}
                    placeholder="e.g. Todo"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.prevSubTasks?.[index]?.name
                        ? //@ts-ignore
                          formik.errors.prevSubTasks?.[index]!.name
                        : ""
                    }
                  />
                  <CrossIcon
                    className={styles.deleteColumn}
                    onClick={() => {
                      formik.setFieldValue(
                        "prevSubTasks",
                        formik.values.prevSubTasks.map((subTask, i) =>
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
          {formik.values.newSubTasks.map((subTask, index) => (
            <div key={index} className={styles.column}>
              <Input
                name={`newSubTasks.${index}`}
                value={subTask}
                placeholder="e.g. Todo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  (formik.touched.newSubTasks as boolean[] | undefined)?.[index]
                    ? formik.errors.newSubTasks?.[index]
                    : ""
                }
              />
              <CrossIcon
                className={styles.deleteColumn}
                onClick={() => {
                  formik.setFieldValue(
                    "newSubTasks",
                    formik.values.newSubTasks.filter((_, i) => i !== index)
                  );
                }}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              formik.setFieldValue("newSubTasks", [
                ...formik.values.newSubTasks,
                "",
              ])
            }
          >
            <PlusIcon /> Add New Subtask
          </Button>
        </div>
        <Button>Save Changes</Button>
      </form>
    </Dialog>
  );
}
