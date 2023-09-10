import { ComponentProps, FC } from "react";

export const ArrowDownIcon: FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      width="10"
      height="7"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#635FC7"
      viewBox="0 0 10 7"
      strokeWidth="2"
      fill="none"
      {...props}
    >
      <path d="m1 1 4 4 4-4" />
    </svg>
  );
};
