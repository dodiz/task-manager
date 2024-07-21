import { ComponentProps, FC } from "react";

export const CheckIcon: FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      width="10"
      height="8"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#FFF"
      strokeWidth="2"
      fill="none"
      {...props}
    >
      <path d="m1.276 3.066 2.756 2.756 5-5" />
    </svg>
  );
};
