"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiAddFill, RiCloseLine } from "@remixicon/react";
import { Dialog } from "@/ui/dialog";
import { Typography } from "@/ui/typography";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { api } from "@/utils/api";
import { useForm } from "react-hook-form";

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
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      columns: [""],
    },
    resolver: zodResolver(
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
  });

  return (
    <Dialog show={show} onHide={onHide}>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit((v) => addBoard.mutate(v))}
      >
        <Typography variant="title-l">Add New Board</Typography>
        <Input
          {...register("name")}
          label="Name"
          placeholder="e.g. Web Design"
          error={errors.name?.message}
        />
        <div className="flex flex-col gap-3">
          <Typography variant="body-sm">Columns</Typography>
          {watch("columns").map((column, index) => (
            <div key={index} className="flex items-center gap-4">
              <Input
                {...register(`columns.${index}`)}
                value={column}
                placeholder="e.g. Todo"
                error={errors.columns?.[index]?.message}
              />
              <RiCloseLine
                className="cursor-pointer text-light-400 size-9 hover:fill-accent-200"
                onClick={() => {
                  setValue(
                    "columns",
                    watch("columns").filter((_, i) => i !== index)
                  );
                }}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() => setValue("columns", [...watch("columns"), ""])}
          >
            <RiAddFill /> Add New Column
          </Button>
          <Button>Create New Board</Button>
        </div>
      </form>
    </Dialog>
  );
}
