import { ComponentProps, FC } from "react";

export const ArrowUpIcon: FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      width="10"
      height="7"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#635FC7"
      strokeWidth="2"
      fill="none"
      {...props}
    >
      <path d="M9 6 5 2 1 6" />
    </svg>
  );
};
