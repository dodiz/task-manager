import classNames from "classnames";
import {
  Button,
  LogoDark,
  LogoLight,
  PlusIcon,
  Typography,
} from "@/components";
import { useTheme } from "@/hooks";
import styles from "./Header.module.scss";

export const Header = () => {
  const { isDark, isSidebarHidden } = useTheme();
  return (
    <header className={classNames(styles.container, isDark && styles.dark)}>
      <div className="flex gap-4">
        {isSidebarHidden ? isDark ? <LogoDark /> : <LogoLight /> : null}
        <Typography variant="xl">Plaform Launch</Typography>
      </div>
      <div>
        <Button>
          <PlusIcon /> Add New Task
        </Button>
      </div>
    </header>
  );
};
