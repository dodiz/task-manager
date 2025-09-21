"use client";

import { z } from "zod";
import { PlusIcon, XIcon } from "lucide-react";
import { Dialog } from "@/ui/dialog";
import { Typography } from "@/ui/typography";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBoardsStore } from "@/hooks/use-boards-store";

type EditBoardModalProps = {
  show: boolean;
  onHide: () => void;
  boardId: string;
};

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

export function EditBoardModal({ show, onHide, boardId }: EditBoardModalProps) {
  const { selectedBoard, editBoard } = useBoardsStore();
  const board = selectedBoard!;
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: board?.name ?? "",
      columns: board.columns?.map((column) => ({
        name: column,
      })),
    },
    resolver: zodResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    name: "columns",
    control,
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    editBoard({
      boardId,
      name: data.name,
      columns: data.columns.map((col) => col.name),
    });
    onHide();
  };

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Typography variant="title-l">Edit Board</Typography>
        <Input
          label="Board Name"
          placeholder="e.g. Web Design"
          {...register("name")}
          error={errors.name?.message}
        />
        <div className="flex flex-col gap-3">
          <Typography variant="body-sm">Board Columns</Typography>
          {fields.map((column, index) => (
            <div key={index} className="flex gap-4 items-center">
              <Input
                value={column.name}
                placeholder="e.g. Todo"
                {...register(`columns.${index}.name`)}
                error={errors.columns?.[index]?.name?.message}
              />
              <XIcon
                className="text-light-400 size-9 hover:fill-accent-200"
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
          <Button>Save Changes</Button>
        </div>
      </form>
    </Dialog>
  );
}
