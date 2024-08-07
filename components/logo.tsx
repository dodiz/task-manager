import type { ComponentProps } from "react";

export function Logo(props: ComponentProps<"svg">) {
  return (
    <svg
      width="24"
      height="25"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-primary-200"
      fillRule="evenodd"
      {...props}
    >
      <rect width="6" height="25" rx="2" />
      <rect opacity=".75" x="9" width="6" height="25" rx="2" />
      <rect opacity=".5" x="18" width="6" height="25" rx="2" />
    </svg>
  );
}
