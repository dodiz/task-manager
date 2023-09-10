import { FC } from "react";
import classNames from "classnames";
import { InputProps } from "./Input.types";
import styles from "./Input.module.scss";
import formStyles from "../Form.module.scss";

export const Input: FC<InputProps> = ({ label, error, ...rest }) => {
  return (
    <label className={formStyles.group}>
      {label && <h4 className={formStyles.label}>{label}</h4>}
      <div
        className={classNames(formStyles.inputWrapper, error && styles.error)}
      >
        <input className={styles.input} {...rest} />
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </label>
  );
};
