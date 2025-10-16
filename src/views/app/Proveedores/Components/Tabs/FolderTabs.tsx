import clsx from "clsx";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTabs, useTabsActions } from "../../Store/Tabs/Tab.selectors";
import TabTrigger from "./TabTrigger";

/**
 * Tabs con subrayado e indicador deslizante.
 * - Modo "auto": reparte el ancho en partes iguales si cada tab puede tener al menos `minTabWidth`.
 *   Si no alcanza, habilita scroll horizontal y usa min-width por tab.
 */
export default function FolderTabs({
  className,
  minTabWidth = 120, // px mínimos por tab antes de pasar a scroll
}: {
  className?: string;
  minTabWidth?: number;
}) {
  const { tabs, activeTabIndex } = useTabs();
  const { setActiveTabIndex } = useTabsActions();

  const listRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  // Modo de distribución: "equal" = flex-1 (reparto equitativo), "scroll" = min-width + scroll
  const [mode, setMode] = useState<"equal" | "scroll">("equal");

  // Mantener longitud de refs en sync con tabs
  btnRefs.current = useMemo(() => Array(tabs.length).fill(null), [tabs.length]);

  /** Medir y posicionar el indicador para el índice dado (corrige el “delay”). */
  const updateIndicatorFor = useCallback((index: number) => {
    const container = listRef.current;
    const btn = btnRefs.current[index];
    if (!container || !btn) return;

    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();

    setIndicator({
      left: bRect.left - cRect.left + container.scrollLeft,
      width: bRect.width,
    });
  }, []);

  /** Recalcular modo de distribución según ancho disponible y cantidad de tabs. */
  const recomputeLayoutMode = useCallback(() => {
    const el = listRef.current;
    if (!el) return;

    const containerWidth = el.clientWidth;
    const count = Math.max(1, tabs.length);
    const perTab = containerWidth / count;

    // Si cada tab puede tener al menos minTabWidth → repartir igual; si no, scroll
    setMode(perTab >= minTabWidth ? "equal" : "scroll");
  }, [tabs.length, minTabWidth]);

  // Recalcular cuando cambia el activo realmente
  useEffect(() => {
    updateIndicatorFor(activeTabIndex);
  }, [activeTabIndex, updateIndicatorFor]);

  // Recalcular en resize y cuando cambie cantidad de tabs
  useEffect(() => {
    recomputeLayoutMode();
    const onResize = () => {
      recomputeLayoutMode();
      // Mantener indicador consistente tras el resize
      updateIndicatorFor(activeTabIndex);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeTabIndex, recomputeLayoutMode, updateIndicatorFor]);

  // Observador por si cambia el ancho del contenedor (p. ej., sidebars, layout responsive)
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      recomputeLayoutMode();
      updateIndicatorFor(activeTabIndex);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [activeTabIndex, recomputeLayoutMode, updateIndicatorFor]);

  // Teclado con roving tabindex
  const getTabIndex = (i: number) => (i === activeTabIndex ? 0 : -1);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const onKey = (e: KeyboardEvent) => {
      const max = tabs.length;
      if (!max) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = (activeTabIndex + 1) % max;
        setActiveTabIndex(next);
        btnRefs.current[next]?.focus();
        updateIndicatorFor(next);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = (activeTabIndex - 1 + max) % max;
        setActiveTabIndex(prev);
        btnRefs.current[prev]?.focus();
        updateIndicatorFor(prev);
      }
      if (e.key === "Home") {
        e.preventDefault();
        setActiveTabIndex(0);
        btnRefs.current[0]?.focus();
        updateIndicatorFor(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        setActiveTabIndex(max - 1);
        btnRefs.current[max - 1]?.focus();
        updateIndicatorFor(max - 1);
      }
    };

    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [activeTabIndex, setActiveTabIndex, tabs.length, updateIndicatorFor]);

  return (
    <div
      role="tablist"
      aria-label="Secciones del proveedor"
      ref={listRef}
      className={clsx(
        // Cuando hay scroll, mantener el overflow-x-auto; cuando es equal también puede quedar, no afecta.
        "relative flex gap-2 p-2 overflow-x-auto border-b border-b-neutral-200 rounded-t-lg pb-0.5 bg-white",
        className
      )}
    >
      {/* Indicador azul */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-[#0568FF] transition-[left,width] duration-200 ease-out"
        style={{ left: indicator.left, width: indicator.width }}
      />

      {tabs.map((t, i) => (
        <TabTrigger
          key={t.id}
          active={i === activeTabIndex}
          onClick={() => {
            setActiveTabIndex(i);
            updateIndicatorFor(i); // posicionar inmediatamente sin “lag”
          }}
          ariaControls={t.id}
          ref={(el) => (btnRefs.current[i] = el)}
          tabIndex={getTabIndex(i)}
          // Distribución: equal (flex-1) vs scroll (min-w)
          variant={mode === "equal" ? "equal" : "scroll"}
          minWidth={minTabWidth}
        >
          {t.label}
        </TabTrigger>
      ))}
    </div>
  );
}
