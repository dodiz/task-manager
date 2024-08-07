import { useEffect, useCallback, type PropsWithChildren } from "react";
import { RiCloseLine } from "@remixicon/react";

type DialogProps = PropsWithChildren & {
  show: boolean;
  onHide: () => void;
};

export function Dialog({ children, show, onHide }: DialogProps) {
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
    <div
      className="fixed top-0 left-0 z-[1000] w-full h-full overflow-x-hidden bg-black/50"
      onClick={onHide}
    >
      <div className="w-full min-h-full flex items-center justify-center">
        <div
          className="relative w-[48rem] rounded-lg m-4 bg-light-100 tablet:p-8 p-5 dark:bg-dark-200"
          onClick={(e) => e.stopPropagation()}
        >
          <RiCloseLine
            onClick={onHide}
            className="absolute top-2 right-2 text-light-400 size-7 hover:fill-accent-200 cursor-pointer"
          />
          {children}
        </div>
      </div>
    </div>
  );
}
