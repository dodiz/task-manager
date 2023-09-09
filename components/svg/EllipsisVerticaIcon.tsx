import { ComponentProps, FC } from "react";

export const EllipsisVerticalIcon: FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      width="5"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      fill="#828FA3"
      fillRule="evenodd"
      {...props}
    >
      <circle cx="2.308" cy="2.308" r="2.308" />
      <circle cx="2.308" cy="10" r="2.308" />
      <circle cx="2.308" cy="17.692" r="2.308" />
    </svg>
  );
};
