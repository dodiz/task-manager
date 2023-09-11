import { ComponentProps, FC } from "react";

export const DotsIcon: FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="20"
      viewBox="0 0 5 20"
      fill="#828FA3"
      {...props}
    >
      <circle cx="2.30769" cy="2.30769" r="2.30769" />
      <circle cx="2.30769" cy="10" r="2.30769" />
      <circle cx="2.30769" cy="17.6923" r="2.30769" />
    </svg>
  );
};
