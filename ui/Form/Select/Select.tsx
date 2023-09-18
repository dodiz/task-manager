import { useState } from "react";
import classNames from "classnames";
import { ArrowDownIcon } from "@/ui";
import styles from "./Select.module.scss";
import { SelectProps } from "./Select.types";
import formStyles from "../Form.module.scss";

export const Select = <T,>({
  items,
  valueField,
  labelField,
  onSelect,
  selected,
  label,
  placeholder,
}: SelectProps<T>) => {
  const [show, setShow] = useState(false);

  return (
    <label
      onClick={() => setShow((p) => !p)}
      className={classNames(formStyles.group, styles.container)}
    >
      {label && <h4 className={formStyles.label}>{label}</h4>}
      <div
        className={classNames(
          formStyles.inputWrapper,
          styles.selectBox,
          show && styles.show
        )}
      >
        {selected ? labelField(selected) : placeholder}
        <ArrowDownIcon className={styles.arrow} />
      </div>
      <div className={classNames(styles.items, show && styles.show)}>
        {items.map((item) => (
          <div
            onClick={() => onSelect(item)}
            key={item[valueField] as string | number}
            className={styles.item}
          >
            {labelField(item)}
          </div>
        ))}
      </div>
    </label>
  );
};
