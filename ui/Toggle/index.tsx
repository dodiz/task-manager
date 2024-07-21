import classNames from "classnames";
import styles from "./toggle.module.scss";

type ToggleProps = {
  checked?: boolean;
  onClick: () => void;
};

export function Toggle({ checked = false, onClick }: ToggleProps) {
  return (
    <div className={styles.toggle} onClick={onClick}>
      <div
        className={classNames(styles.toggleButton, checked && styles.checked)}
      />
    </div>
  );
}
