import { ComponentProps, FC } from "react";

export const MoonIcon: FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="20"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 19 20"
      fill="#828FA3"
      {...props}
    >
      <path d="M 15 10 c 0.408 -0.18 0.894 0.165 0.724 0.57 c -1.16 2.775 -3.944 4.7292 -7.194 4.7292 c -4.292 0 -7.771 -3.4092 -7.771 -7.615 c 0 -3.5409 2.466 -6.5175 5.807 -7.37 c 0.434 -0.11 0.718 0.4066 0.481 0.78 c -0.618 0.9741 -0.946 2.1044 -0.945 3.2583 c 0 3.4175 2.827 6.1875 6.314 6.1875 c 0.89 0.0015 1.77 -0.1824 2.584 -0.54 z m -4.406 -8.9417 c -0.295 -0.4416 0.232 -0.9683 0.674 -0.6733 l 0.787 0.525 c 0.32 0.213 0.695 0.3266 1.079 0.3266 c 0.383 0 0.759 -0.1136 1.078 -0.3266 l 0.787 -0.525 c 0.442 -0.295 0.969 0.2317 0.674 0.6733 l -0.525 0.7875 c -0.213 0.3193 -0.327 0.6946 -0.327 1.0784 c 0 0.3838 0.114 0.759 0.327 1.0783 l 0.525 0.7875 c 0.295 0.4417 -0.232 0.9683 -0.674 0.6733 l -0.787 -0.525 c -0.319 -0.2129 -0.695 -0.3266 -1.078 -0.3266 c -0.384 0 -0.759 0.1137 -1.079 0.3266 l -0.786 0.525 c -0.442 0.295 -0.97 -0.2316 -0.675 -0.6733 l 0.525 -0.7875 c 0.213 -0.3193 0.326 -0.6945 0.326 -1.0783 c 0 -0.3838 -0.113 -0.7591 -0.326 -1.0784 l -0.525 -0.7875 z" />
    </svg>
  );
};
