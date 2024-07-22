"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { PlusIcon } from "@/icons/plus-icon";
import { CrossIcon } from "@/icons/cross-icon";
import { Dialog } from "@/ui/dialog";
import { Typography } from "@/ui/typography";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { api } from "@/utils/api";

export function AddBoardModal({
  show,
  onHide,
}: {
  show: boolean;
  onHide: () => void;
}) {
  const router = useRouter();
  const getBoards = api.boards.getAll.useQuery();
  const addBoard = api.boards.add.useMutation({
    onSuccess: ({ id }) => {
      getBoards.refetch();
      onHide();
      router.push(`/${id}`);
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
      <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
        <Typography variant="title-l">Add New Board</Typography>
        <Input
          name="name"
          value={formik.values.name}
          label="Name"
          placeholder="e.g. Web Design"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name ? formik.errors.name : ""}
        />
        <div className="flex flex-col gap-3">
          <Typography variant="body-sm">Columns</Typography>
          {formik.values.columns.map((column, index) => (
            <div key={index} className="flex items-center gap-4">
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
                className="cursor-pointer hover:fill-accent-200"
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
          <Button>Create New Board</Button>
        </div>
      </form>
    </Dialog>
  );
}
