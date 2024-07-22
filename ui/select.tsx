"use client";

import { useState } from "react";
import classNames from "classnames";
import { ArrowDownIcon } from "@/icons/arrow-down-icon";

type SelectProps<T> = {
  items: T[];
  valueField: keyof T;
  labelField: (item: T) => string;
  selected: T | null;
  onSelect: (item: T) => void;
  label?: string;
  placeholder: string;
  disabled?: boolean;
  error?: string;
};

export const Select = <T,>({
  items,
  valueField,
  labelField,
  onSelect,
  selected,
  label,
  placeholder,
  error,
}: SelectProps<T>) => {
  const [show, setShow] = useState(false);

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
        className={classNames(
          "bg-light-100 border-light-400/25 border-[0.15rem] rounded-[.4rem] border-primary-200 aria-hidden:border-light-400/25 py-3 px-4 font-medium text-[1.3rem] w-full transition-colors flex items-center justify-between dark:bg-dark-200 dark:text-light-100",
          error && "border-accent-200"
        )}
      >
        {selected ? labelField(selected) : placeholder}
        {error && (
          <p className="absolute right-[3.5rem] text-accent-200 font-medium text-[1.3rem]">
            {error}
          </p>
        )}
        <ArrowDownIcon />
      </div>
      <div
        aria-hidden={!show}
        className="flex aria-hidden:hidden rounded-[.8rem] absolute w-full top-[7rem] p-4 flex-col gap-2 border border-light-300 dark:border-0 bg-light-100 dark:bg-dark-300 shadow-2xl"
      >
        {items.map((item) => (
          <div
            onClick={() => onSelect(item)}
            key={item[valueField] as string | number}
            className="text-light-400 text-[1.3rem] font-medium leading-[2.3rem]"
          >
            {labelField(item)}
          </div>
        ))}
      </div>
    </label>
  );
};
