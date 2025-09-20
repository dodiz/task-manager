import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Close,
  Content,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/utils/cn";

type DialogProps = {
  children: React.ReactNode;
  open?: boolean;
  trigger?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
};

export function Dialog({ children, trigger, open, onOpenChange }: DialogProps) {
  return (
    <Root data-slot="dialog" open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <Trigger data-slot="dialog-trigger" asChild>
          {trigger}
        </Trigger>
      )}
      <Portal data-slot="dialog-portal">
        <Overlay
          data-slot="dialog-overlay"
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50"
        />
        <Content
          data-slot="dialog-content"
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-1/2 left-1/2 z-50 w-full max-w-[calc(100%-2rem)] -translate-1/2 gap-4 desktop:max-w-120 shadow-lg duration-200 rounded-lg bg-light-100 tablet:p-8 p-5 dark:bg-dark-200"
          )}
        >
          <DialogTitle />
          <Close
            data-slot="dialog-close"
            className="absolute top-4 right-4 transition-colors hover:text-accent-200  text-light-400 size-7 cursor-pointer"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </Close>
          {children}
        </Content>
      </Portal>
    </Root>
  );
}
