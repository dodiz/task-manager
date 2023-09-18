export type SelectProps = {
  label?: string;
  items: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};
