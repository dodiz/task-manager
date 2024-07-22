import classNames from "classnames";
import { CheckIcon } from "@/icons/check-icon";

type SubTaskProps = {
  completed: boolean;
  label: string;
  onClick: () => void;
};

export function SubTask({ completed, onClick, label }: SubTaskProps) {
  return (
    <div
      className={classNames(
        "p-3 flex items-center gap-4 bg-light-200 rounded-[.4rem] cursor-pointer text-nowrap hover:bg-primary-200/25 dark:bg-dark-300"
      )}
      onClick={onClick}
    >
      <div
        className={classNames(
          "flex items-center justify-center border border-[#828fa340] bg-light-100 rounded-[.2rem] w-4 h-4 cursor-pointer dark:bg-dark-200",
          completed && "bg-primary-200 dark:bg-primary-200"
        )}
      >
        <CheckIcon className={classNames(completed ? "block" : "hidden")} />
      </div>
      <p
        className={classNames(
          "text-dark-400 dark:text-light-100 text-xs font-bold select-none",
          completed && "line-through opacity-50"
        )}
      >
        {label}
      </p>
    </div>
  );
}
