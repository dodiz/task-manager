import { FC } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { Dialog, Typography, Input, Button, PlusIcon, CrossIcon } from "@/ui";
import { api } from "@/utils/api";
import { EditBoardProps } from "./AddBoard.types";
import styles from "./AddBoard.module.scss";

export const EditBoard: FC<EditBoardProps> = ({ show, onHide, boardId }) => {
  const getBoards = api.getBoards.useQuery();
  const { data: board } = api.getBoard.useQuery({ id: boardId });
  const editBoard = api.updateBoard.useMutation({
    onSuccess: () => {
      getBoards.refetch();
      onHide();
    },
  });
  const formik = useFormik({
    initialValues: {
      name: board?.name ?? "",
      columns: board?.columns.map(column => ({
        name: column.name,
        id: column.id,
        action: "update"
      })) ?? [],
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        name: z.string({
          required_error: "Can't be empty",
        }),
        columns: z.array(
          z.object({
            name: z.string({
              required_error: "Can't be empty",
            }),
            id: z.number(),
          })
        ),
      })
    ),
    onSubmit: (values) =>
      editBoard.mutate({
        id: boardId,
        name: values.name,
        columns: values.columns
          .filter((c) => c.id === -1)
          .map((column) => column.name),
      }),
  });

  return (
    <Dialog show={show} onHide={onHide}>
      <div className={styles.container}>
        <Typography variant="l">Add New Board</Typography>
        <Input
          name="name"
          value={formik.values.name}
          label="Board Name"
          placeholder="e.g. Web Design"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name ? formik.errors.name : ""}
        />
        <div className={styles.columns}>
          <Typography variant="text-sm">Board Columns</Typography>
          {formik.values.columns.map((column, index) => (
            <div key={index} className={styles.column}>
              <Input
                name={`columns.${index}`}
                value={column}
                placeholder="e.g. Todo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  (formik.touched.columns as boolean[] | undefined)?.[index]
                    ? formik.errors.columns?.[index]
                    : ""
                }
              />
              <CrossIcon
                className={styles.deleteColumn}
                onClick={() => {
                  formik.setFieldValue(
                    "columns",
                    formik.values.columns.filter((_, i) => i !== index)
                  );
                }}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              formik.setFieldValue("columns", [...formik.values.columns, ""])
            }
          >
            <PlusIcon /> Add New Column
          </Button>
        </div>
        <Button onClick={() => formik.handleSubmit()}>Create New Board</Button>
      </div>
    </Dialog>
  );
};
