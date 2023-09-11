import { useEffect, useCallback, type FC } from "react";
import classNames from "classnames";
import { useTheme } from "@/hooks";
import { CrossIcon } from "@/ui";
import { DialogProps } from "./Dialog.types";
import styles from "./Dialog.module.scss";

export const Dialog: FC<DialogProps> = ({ children, show, onHide }) => {
  const { isDark } = useTheme();

  const escapeListener = useCallback(
    (e: KeyboardEvent) => e.key === "Escape" && onHide(),
    [onHide]
  );

  useEffect(() => {
    if (show) document.addEventListener("keydown", escapeListener);
    else document.removeEventListener("keydown", escapeListener);

    return () => document.removeEventListener("keydown", escapeListener);
  }, [onHide, show, escapeListener]);

  if (!show) return null;

  return (
    <div className={styles.backdrop} onClick={onHide}>
      <div className={styles.wrapper}>
        <div
          className={classNames(styles.modal, isDark && styles.dark)}
          onClick={(e) => e.stopPropagation()}
        >
          <CrossIcon onClick={onHide} className={styles.closeIcon} />
          {children}
        </div>
      </div>
    </div>
  );
};
