export type SelectProps<T> = {
  items: T[];
  valueField: keyof T;
  labelField: (item: T) => string;
  selected: T | null;
  onSelect: (item: T) => void;
  label?: string;
  placeholder: string;
  disabled?: boolean;
  error?: string;
};
