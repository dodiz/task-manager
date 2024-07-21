import { ComponentProps, FC } from "react";

export const PlusIcon: FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      width="14"
      height="14"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      viewBox="0 0 14 14"
      strokeWidth={2}
      stroke="currentColor"
      {...props}
    >
      <path d="M 14 8 L 2 8 Z M 8 2 L 8 14 Z" />
    </svg>
  );
};
