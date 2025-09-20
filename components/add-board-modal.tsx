"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiAddFill, RiCloseLine, RiLayoutLine } from "@remixicon/react";
import { Dialog } from "@/ui/dialog";
import { Typography } from "@/ui/typography";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { api } from "@/utils/api";
import { useForm } from "react-hook-form";
import { cn } from "@/utils/cn";
import { Plus } from "lucide-react";
import { useState } from "react";

interface AddBoardModalProps {
  disabled?: boolean;
}

export function AddBoardModal({ disabled }: AddBoardModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const getBoards = api.boards.getAll.useQuery();
  const addBoard = api.boards.add.useMutation({
    onSuccess: ({ id }) => {
      getBoards.refetch();
      setOpen(true);
      router.push(`/${id}`);
    },
  });
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    getValues,
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

  const columns = watch("columns");

  return (
    <>
      <div
        className={cn(
          "transition-all flex items-center gap-4 py-4 pl-8 cursor-pointer text-base font-bold text-primary-200",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => !disabled && setOpen(true)}
      >
        <RiLayoutLine radius={20} className="size-5" />
        <div className="flex items-center gap-2">
          <Plus />
          Create new board
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
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
            {columns.map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <Input
                  {...register(`columns.${index}`)}
                  placeholder="e.g. Todo"
                  error={errors.columns?.[index]?.message}
                />
                <RiCloseLine
                  className="cursor-pointer text-light-400 size-9 hover:fill-accent-200"
                  onClick={() => {
                    setValue(
                      "columns",
                      getValues("columns").filter((_, i) => i !== index)
                    );
                  }}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              disabled={
                columns.length >= 5 || columns.some((col) => col.trim() === "")
              }
              onClick={() => setValue("columns", [...getValues("columns"), ""])}
            >
              <RiAddFill /> Add New Column
            </Button>
            <Button>Create New Board</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
