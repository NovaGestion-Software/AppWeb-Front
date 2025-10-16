import clsx from "clsx";
import { PropsWithChildren, forwardRef } from "react";

type Variant = "equal" | "scroll";

/** Botón de pestaña estilo “underline”. */
const TabTrigger = forwardRef<HTMLButtonElement, PropsWithChildren<{
  active: boolean;
  onClick: () => void;
  ariaControls: string;
  tabIndex?: number;
  /** "equal" reparte con flex-1; "scroll" usa min-width y permite overflow-x */
  variant?: Variant;
  /** Ancho mínimo por tab en modo "scroll" (px). */
  minWidth?: number;
}>>(({ active, onClick, ariaControls, children, tabIndex, variant = "equal", minWidth = 120 }, ref) => {
  const base = "relative inline-flex h-9 items-center px-3 text-sm font-medium outline-none whitespace-nowrap";
  const color = active ? "text-[#0568FF]" : "text-neutral-600 hover:text-neutral-800";

  // equal → flex-1 + min-w-0 para truncar texto correctamente y repartir ancho
  // scroll → flex-none + min-w fija para habilitar overflow horizontal
  const layout =
    variant === "equal"
      ? "flex-1 min-w-0 justify-center"
      : "flex-none";

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={ariaControls}
      tabIndex={tabIndex}
      className={clsx(base, color, layout)}
      style={variant === "scroll" ? { minWidth } : undefined}
      onClick={onClick}
      title={typeof children === "string" ? children : undefined}
    >
      <span className="truncate">{children}</span>
    </button>
  );
});

export default TabTrigger;
