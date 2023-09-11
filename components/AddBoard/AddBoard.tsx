import { FC } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { Dialog, Typography, Input, Button, PlusIcon, CrossIcon } from "@/ui";
import { api } from "@/utils/api";
import styles from "./AddBoard.module.scss";
import { AddBoardProps } from "./AddBoard.types";

export const AddBoard: FC<AddBoardProps> = ({ show, onHide }) => {
  const getBoards = api.getBoards.useQuery();
  const addBoard = api.addBoard.useMutation({
    onSuccess: () => {
      getBoards.refetch();
      onHide();
    },
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      columns: [""],
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        name: z.string({
          required_error: "Can't be empty",
        }),
        columns: z.array(
          z.string({
            required_error: "Can't be empty",
          })
        ),
      })
    ),
    onSubmit: (values) => addBoard.mutate(values),
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
