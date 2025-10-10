import clsx from "clsx";
import { PropsWithChildren, forwardRef } from "react";

/** Botón de pestaña estilo “underline” (sin dark mode). */
const TabTrigger = forwardRef<HTMLButtonElement, PropsWithChildren<{
  active: boolean;
  onClick: () => void;
  ariaControls: string;
  tabIndex?: number;
}>>(({ active, onClick, ariaControls, children, tabIndex }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={ariaControls}
      tabIndex={tabIndex}
      className={clsx(
        "relative inline-flex h-9 items-center px-3 text-sm font-medium outline-none",
        active ? "text-[#0568FF]" : "text-neutral-600 hover:text-neutral-800"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

export default TabTrigger;
