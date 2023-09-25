import { FC } from "react";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { Dialog, Typography, Input, Button, PlusIcon, CrossIcon } from "@/ui";
import { api } from "@/utils/api";
import { ModalProps } from "./Modal.types";
import styles from "./Modals.module.scss";

export const EditBoardModal: FC<ModalProps> = ({ show, onHide }) => {
  const { refetch: refetchAll } = api.boards.getAll.useQuery();
  const { boardId } = useParams();
  const { data: board, refetch: refetch } = api.boards.getById.useQuery(
    { id: +boardId },
    { enabled: !!boardId }
  );
  const editBoard = api.boards.update.useMutation({
    onSuccess: () => {
      refetch();
      refetchAll();
      onHide();
    },
  });
  const formik = useFormik({
    initialValues: {
      name: board?.name ?? "",
      prevColumns:
        board?.columns?.map((column) => ({
          name: column.name,
          id: column.id,
          action: "update" as "update" | "delete",
        })) ?? [],
      newColumns: [] as string[],
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        name: z.string({
          required_error: "Can't be empty",
        }),
        prevColumns: z.array(
          z.object({
            name: z.string({
              required_error: "Can't be empty",
            }),
            action: z.enum(["delete", "update"]),
            id: z.number(),
          })
        ),
        newColumns: z.array(
          z.string({
            required_error: "Can't be empty",
          })
        ),
      })
    ),
    enableReinitialize: true,
    onSubmit: (values) => {
      editBoard.mutate({ id: +boardId, ...values });
    },
  });

  return (
    <Dialog show={show} onHide={onHide}>
      <form onSubmit={formik.handleSubmit} className={styles.container}>
        <Typography variant="title-l">Edit Board</Typography>
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
          <Typography variant="body-sm">Board Columns</Typography>
          {formik.values.prevColumns.map(
            (column, index) =>
              column.action !== "delete" && (
                <div key={index} className={styles.column}>
                  <Input
                    name={`prevColumns.${index}.name`}
                    value={column.name}
                    placeholder="e.g. Todo"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.prevColumns?.[index]?.name
                        ? //@ts-ignore
                          formik.errors.prevColumns?.[index]!.name
                        : ""
                    }
                  />
                  <CrossIcon
                    className={styles.deleteColumn}
                    onClick={() => {
                      formik.setFieldValue(
                        "prevColumns",
                        formik.values.prevColumns.map((column, i) =>
                          i === index ? { ...column, action: "delete" } : column
                        )
                      );
                    }}
                  />
                </div>
              )
          )}
          {formik.values.newColumns.map((column, index) => (
            <div key={index} className={styles.column}>
              <Input
                name={`newColumns.${index}`}
                value={column}
                placeholder="e.g. Todo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  (formik.touched.newColumns as boolean[] | undefined)?.[index]
                    ? formik.errors.newColumns?.[index]
                    : ""
                }
              />
              <CrossIcon
                className={styles.deleteColumn}
                onClick={() => {
                  formik.setFieldValue(
                    "newColumns",
                    formik.values.newColumns.filter((_, i) => i !== index)
                  );
                }}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              formik.setFieldValue("newColumns", [
                ...formik.values.newColumns,
                "",
              ])
            }
          >
            <PlusIcon /> Add New Column
          </Button>
        </div>
        <Button>Save Changes</Button>
      </form>
    </Dialog>
  );
};
