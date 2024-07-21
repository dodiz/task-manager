import { FC, ComponentProps, useId } from "react";

export const SpinnerIcon: FC<ComponentProps<"svg">> = ({ fill, ...props }) => {
  const gradientId = useId();
  return (
    <svg
      viewBox="0 0 200 200"
      color={fill || "currentColor"}
      fill="none"
      width="3rem"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id={"spinner-secondHalf" + gradientId}>
          <stop offset="0%" stopOpacity="0" stopColor="currentColor" />
          <stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
        </linearGradient>
        <linearGradient id={"spinner-firstHalf" + gradientId}>
          <stop offset="0%" stopOpacity="1" stopColor="currentColor" />
          <stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
        </linearGradient>
      </defs>
      <g strokeWidth="24">
        <path
          stroke={"url(#spinner-secondHalf" + gradientId + ")"}
          d="M 12 100 A 88 88 0 0 1 188 100"
        />
        <path
          stroke={"url(#spinner-firstHalf" + gradientId + ")"}
          d="M 188 100 A 88 88 0 0 1 12 100"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          d="M 12 100 A 88 88 0 0 1 12 98"
        />
      </g>
      <animateTransform
        from="0 0 0"
        to="360 0 0"
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1300ms"
      />
    </svg>
  );
};
