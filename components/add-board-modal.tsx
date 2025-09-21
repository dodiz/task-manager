"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquareKanban } from "lucide-react";
import { Dialog } from "@/ui/dialog";
import { Typography } from "@/ui/typography";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { cn } from "@/utils/cn";
import { Plus, XIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useBoardsStore } from "@/hooks/use-boards-store";

interface AddBoardModalProps {
  disabled?: boolean;
}

const schema = z.object({
  name: z.string({
    required_error: "Can't be empty",
  }),
  columns: z.array(
    z.object({
      name: z.string({
        required_error: "Can't be empty",
      }),
    })
  ),
});

export function AddBoardModal({ disabled }: AddBoardModalProps) {
  const { addBoard } = useBoardsStore();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: "",
      columns: [{ name: "" }],
    },
    resolver: zodResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const onSubmit: (data: z.infer<typeof schema>) => void = (data) => {
    addBoard({
      name: data.name,
      columns: data.columns.map((col) => col.name),
    });
    reset();
    setOpen(false);
  };

  return (
    <>
      <div
        className={cn(
          "transition-all flex items-center gap-4 py-4 pl-8 cursor-pointer text-base font-bold text-primary-200",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => !disabled && setOpen(true)}
      >
        <SquareKanban className="size-5" />
        <div className="flex items-center gap-2">
          <Plus />
          Create new board
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="title-l">Add New Board</Typography>
          <Input
            {...register("name")}
            label="Name"
            placeholder="e.g. Web Design"
            error={errors.name?.message}
          />
          <div className="flex flex-col gap-3">
            <Typography variant="body-sm">Columns</Typography>
            {fields.map((column, index) => (
              <div key={column.id} className="flex items-center gap-4">
                <Input
                  {...register(`columns.${index}.name`)}
                  error={errors.columns?.[index]?.message}
                />
                <XIcon
                  className="cursor-pointer text-light-400 size-9 hover:text-accent-200"
                  onClick={() => remove(index)}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() => append({ name: "" })}
            >
              <PlusIcon /> Add New Column
            </Button>
            <Button>Create New Board</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
