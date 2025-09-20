"use client";

import { z } from "zod";
import { RiAddFill, RiCloseLine } from "@remixicon/react";
import { Dialog } from "@/ui/dialog";
import { Typography } from "@/ui/typography";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { api } from "@/utils/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type EditBoardModalProps = {
  show: boolean;
  onHide: () => void;
  boardId: number;
};

export function EditBoardModal({ show, onHide, boardId }: EditBoardModalProps) {
  const { refetch: refetchAll } = api.boards.getAll.useQuery();
  const { data: board, refetch: refetch } = api.boards.getById.useQuery(
    { id: boardId },
    { enabled: !!boardId }
  );
  const editBoard = api.boards.update.useMutation({
    onSuccess: () => {
      refetch();
      refetchAll();
      onHide();
    },
  });
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: board?.name ?? "",
      prevColumns:
        board?.columns?.map((column) => ({
          name: column.name,
          id: column.id,
          action: "update" as "update" | "delete",
        })) ?? [],
      newColumns: [] as string[],
    },
    resolver: zodResolver(
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
  });

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <form
        onSubmit={handleSubmit((values) =>
          editBoard.mutate({
            id: boardId,
            ...values,
          })
        )}
        className="flex flex-col gap-6"
      >
        <Typography variant="title-l">Edit Board</Typography>
        <Input
          label="Board Name"
          placeholder="e.g. Web Design"
          {...register("name")}
          error={errors.name?.message}
        />
        <div className="flex flex-col gap-3">
          <Typography variant="body-sm">Board Columns</Typography>
          {watch("prevColumns").map(
            (column, index) =>
              column.action !== "delete" && (
                <div key={index} className="flex gap-4 items-center">
                  <Input
                    value={column.name}
                    placeholder="e.g. Todo"
                    {...register(`prevColumns.${index}.name`)}
                    error={errors.prevColumns?.[index]?.name?.message}
                  />
                  <RiCloseLine
                    className="text-light-400 size-9 hover:fill-accent-200"
                    onClick={() => {
                      setValue(
                        "prevColumns",
                        watch("prevColumns").map((column, i) =>
                          i === index ? { ...column, action: "delete" } : column
                        )
                      );
                    }}
                  />
                </div>
              )
          )}
          {watch("newColumns").map((column, index) => (
            <div key={index} className="flex items-center gap-4">
              <Input
                value={column}
                placeholder="e.g. Todo"
                {...register(`newColumns.${index}`)}
                error={errors.newColumns?.[index]?.message}
              />
              <RiCloseLine
                className="text-light-400 size-9 hover:fill-accent-200"
                onClick={() => {
                  setValue(
                    "newColumns",
                    watch("newColumns").filter((_, i) => i !== index)
                  );
                }}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() => setValue("newColumns", [...watch("newColumns"), ""])}
          >
            <RiAddFill /> Add New Column
          </Button>
          <Button>Save Changes</Button>
        </div>
      </form>
    </Dialog>
  );
}
