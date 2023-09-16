import { FC } from "react";
import { SpinnerIcon } from "@/ui";
import styles from "./LoadingSpinner.module.scss";

export const LoadingSpinner: FC = () => {
  return (
    <div className={styles.container}>
      <SpinnerIcon />
    </div>
  );
};
