import classNames from "classnames";
import { useTheme } from "@/hooks";
import {
  Button,
  LogoDark,
  LogoLight,
  PlusIcon,
  Typography,
  DotsIcon,
} from "@/ui";
import styles from "./Header.module.scss";

export const Header = () => {
  const { isDark, isSidebarHidden } = useTheme();
  return (
    <header className={classNames(styles.container, isDark && styles.dark)}>
      <div className="flex gap-4">
        {isSidebarHidden ? isDark ? <LogoDark /> : <LogoLight /> : null}
        <Typography variant="xl">Plaform Launch</Typography>
      </div>
      <div className={styles.right}>
        <Button>
          <PlusIcon /> Add New Task
        </Button>
        <DotsIcon />
      </div>
    </header>
  );
};
