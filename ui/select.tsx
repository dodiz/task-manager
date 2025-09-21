"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";

type SelectProps<T extends Record<string, unknown> | string> = {
  items: T[];
  selected: NoInfer<T> | null;
  onSelect: (item: NoInfer<T>) => void;
  label?: string;
  placeholder: string;
  disabled?: boolean;
  error?: string;
} & (T extends string
  ? {
      idField?: never;
      labelField?: never;
    }
  : {
      idField: keyof T;
      labelField: (item: T) => string;
    });

export const Select = <T extends Record<string, unknown> | string>({
  items,
  idField,
  labelField,
  onSelect,
  selected,
  label,
  placeholder,
  error,
}: SelectProps<T>) => {
  const [show, setShow] = useState(false);

  const getLabel = (item: T) =>
    typeof item === "string" ? item : labelField?.(item);

  const getId = (item: T) =>
    typeof item === "string" ? item : (item[idField!] as string);

  return (
    <label
      onClick={() => setShow((p) => !p)}
      className="cursor-pointer relative select-none flex flex-col gap-2 w-full"
    >
      {label && (
        <h4 className="text-light-400 text-[1.2rem] font-bold dark:text-light-100">
          {label}
        </h4>
      )}
      <div
        aria-hidden={!show}
        className={cn(
          "bg-light-100 border-[0.15rem] rounded-[.4rem] border-primary-200 aria-hidden:border-light-400/25 py-3 px-4 font-medium text-[1.3rem] w-full transition-colors flex items-center justify-between dark:bg-dark-200 dark:text-light-100",
          error && "border-accent-200"
        )}
      >
        {selected ? getLabel(selected) : placeholder}
        {error && (
          <p className="absolute right-[3.5rem] text-accent-200 font-medium text-[1.3rem]">
            {error}
          </p>
        )}
        <ChevronDown className="w-5 text-primary-200" />
      </div>
      <div
        aria-hidden={!show}
        className="flex aria-hidden:hidden rounded-[.8rem] absolute w-full top-[7rem] p-4 flex-col gap-2 border border-light-300 dark:border-0 bg-light-100 dark:bg-dark-300 shadow-2xl"
      >
        {items.map((item, i) => (
          <div
            onClick={() => onSelect(item)}
            key={getId(item)}
            className="text-light-400 text-[1.3rem] font-medium leading-[2.3rem]"
          >
            {getLabel(item)}
          </div>
        ))}
      </div>
    </label>
  );
};
