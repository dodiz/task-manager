import { SpinnerIcon } from "@/icons/spinner-icon";
import styles from "./loading-spinner.module.scss";

export function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <SpinnerIcon />
    </div>
  );
}
