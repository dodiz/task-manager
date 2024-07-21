import { useEffect, useCallback, type PropsWithChildren } from "react";
import classNames from "classnames";
import { useTheme } from "@/hooks";
import { CrossIcon } from "@/icons/cross-icon";
import styles from "./dialog.module.scss";

type DialogProps = PropsWithChildren & {
  show: boolean;
  onHide: () => void;
};

export function Dialog({ children, show, onHide }: DialogProps) {
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
}
