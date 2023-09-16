import { FC } from "react";
import { Dialog, Typography, Input, Button, PlusIcon, CrossIcon } from "@/ui";
import { ModalProps } from "./Modal.types";
import styles from "./Modals.module.scss";

export const EditTaskModal: FC<ModalProps> = ({ show, onHide }) => {
  return (
    <Dialog show={show} onHide={onHide}>
      <form className={styles.container}>
        <Typography variant="l">Edit task</Typography>
        <Input
          name="name"
          value={"formik.values.name"}
          label="Name"
          placeholder="e.g. Web Design"
          onChange={() => {}}
          onBlur={() => {}}
          error={""}
        />
        <div className={styles.columns}>
          <Typography variant="text-sm">Columns</Typography>
          {[].map((column, index) => (
            <div key={index} className={styles.column}>
              <Input
                name={`columns.${index}`}
                value={column}
                placeholder="e.g. Todo"
                onChange={() => {}}
                onBlur={() => {}}
                error={""}
              />
              <CrossIcon className={styles.deleteColumn} onClick={() => {}} />
            </div>
          ))}
          <Button type="button" variant="secondary" onClick={() => {}}>
            <PlusIcon /> Add New SubTask
          </Button>
        </div>
        <Button>Save changes</Button>
      </form>
    </Dialog>
  );
};
