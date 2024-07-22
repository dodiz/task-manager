type ToggleProps = {
  checked?: boolean;
  onClick: () => void;
};

export function Toggle({ checked = false, onClick }: ToggleProps) {
  return (
    <div
      className="p-1 bg-primary-200 rounded-[5rem] w-10 cursor-pointer relative h-[1.4rem] box-content"
      onClick={onClick}
    >
      <div
        aria-checked={checked}
        className="absolute mx-[.34rem] left-0 w-[1.4rem] h-[1.4rem] rounded-full bg-white transition-all aria-checked:left-[2.6rem]"
      />
    </div>
  );
}
