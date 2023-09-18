import { useParams } from "next/navigation";
import { FC } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import {
  Dialog,
  Typography,
  Input,
  Button,
  PlusIcon,
  CrossIcon,
  Select,
} from "@/ui";
import { api } from "@/utils/api";
import { ModalProps } from "./Modal.types";
import styles from "./Modals.module.scss";

export const AddTaskModal: FC<ModalProps> = ({ show, onHide }) => {
  const { id } = useParams();
  const { data: board, refetch: refetchBoard } = api.boards.getById.useQuery({
    id: +id,
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
      columnId: null as number | null,
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        name: z.string({
          required_error: "Can't be empty",
        }),
        description: z.string(),
        subTasks: z.array(
          z.string({
            required_error: "Can't be empty",
          })
        ),
        columnId: z.number(),
      })
    ),
    onSubmit: ({ name, description, subTasks, columnId }) =>
      addTask.mutate({
        name,
        description,
        subTasks,
        columnId: columnId!,
      }),
  });

  return (
    <Dialog show={show} onHide={onHide}>
      <form onSubmit={formik.handleSubmit} className={styles.container}>
        <Typography variant="l">Add Task</Typography>
        <Input
          name="name"
          value={formik.values.name}
          label="Name"
          placeholder="e.g. Web Design"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name ? formik.errors.name : ""}
        />
        <Input
          name="description"
          value={formik.values.description}
          label="Description"
          placeholder="e.g. Design a website for a client"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description ? formik.errors.description : ""}
        />
        <div className={styles.columns}>
          <Typography variant="text-sm">Subtasks</Typography>
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
          <Select
            placeholder="Select a status"
            label="Status"
            items={board?.columns.map((c) => c.name) ?? []}
            onChange={() => {}}
            value=""
          />
        </div>
        <Button>Create Task</Button>
      </form>
    </Dialog>
  );
};
