export type DropdownProps = {
  items: {
    onClick: () => void;
    label: string;
    variant?: "danger" | "primary";
  }[];
  align?: "center" | "right";
};
