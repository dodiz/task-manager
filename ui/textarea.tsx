import { ComponentProps } from "react";
import classNames from "classnames";

type TextareaProps = ComponentProps<"textarea"> & {
  label?: string;
  error?: string;
};

export function Textarea({ label, error, ...rest }: TextareaProps) {
  return (
    <label className="flex flex-col gap-2 w-full">
      {label && (
        <h4 className="text-light-400 text-[1.2rem] font-bold dark:text-light-100">
          {label}
        </h4>
      )}
      <div
        className={classNames(
          "bg-light-100 border-[.15rem] rounded-[.4rem] py-3 px-4 font-medium text-[1.3rem] w-full transition-colors flex items-center justify-between dark:bg-dark-200  focus-within:border-primary-200 border-light-400/25",
          error && "border-accent-200"
        )}
      >
        <textarea
          className="bg-transparent border-none outline-none w-full resize-none h-[11rem] leading-[2.3rem placeholder:text-dark-400/25 font-semibold"
          {...rest}
        />
        <p className="text-accent-200 font-medium text-[1.3rem]">{error}</p>
      </div>
    </label>
  );
}
