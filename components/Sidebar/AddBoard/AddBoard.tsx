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
      columns: [] as string[],
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        name: z.string({
          required_error: "Board name must be a string",
        }),
        columns: z.array(z.string()),
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
          onChange={formik.handleChange}
          value={formik.values.name}
          label="Board Name"
          placeholder=""
          error={formik.errors.name}
        />
        <div className={styles.columns}>
          <Typography variant="text-sm">Board Columns</Typography>
          {formik.values.columns.map((column, index) => (
            <div key={index} className={styles.column}>
              <Input
                name="column"
                value={column}
                onChange={({ target }) => {
                  const columns = [...formik.values.columns];
                  columns[index] = target.value;
                  formik.setFieldValue("columns", columns);
                }}
              />
              <CrossIcon
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
            variant="secondary"
            onClick={() =>
              formik.setFieldValue("columns", [...formik.values.columns, ""])
            }
          >
            <PlusIcon /> Add New Column
          </Button>
        </div>
        <Button onClick={formik.handleSubmit}>Create New Board</Button>
      </div>
    </Dialog>
  );
};
