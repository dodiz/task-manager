import { ComponentProps, FC } from "react";

export const CrossIcon: FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      width="15"
      height="15"
      xmlns="http://www.w3.org/2000/svg"
      fill="#828FA3"
      fillRule="evenodd"
      {...props}
    >
      <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
      <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
    </svg>
  );
};
