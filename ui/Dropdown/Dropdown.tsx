import { FC, useState } from "react";
import classNames from "classnames";
import { useClickOutside, useTheme } from "@/hooks";
import { DotsIcon, Typography } from "@/ui";
import { DropdownProps } from "./Dropdown.types";
import styles from "./Dropdown.module.scss";

export const Dropdown: FC<DropdownProps> = ({ items }) => {
  const { isDark } = useTheme();
  const [show, setShow] = useState(false);
  const ref = useClickOutside(() => setShow(false));
  return (
    <div className={styles.container} onClick={() => setShow((p) => !p)}>
      <DotsIcon className={styles.dots} />
      <div
        ref={ref}
        className={classNames(
          styles.items,
          isDark && styles.dark,
          show && styles.show
        )}
      >
        {items.map(({ label, onClick, variant }, i) => (
          <div key={i} onClick={onClick}>
            <Typography
              variant="body"
              className={classNames(
                styles.item,
                variant === "danger" && styles.danger
              )}
            >
              {label}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
