import clsx from "clsx";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTabs, useTabsActions } from "../../Store/Tabs/Tab.selectors";
import TabTrigger from "./TabTrigger";

/**
 * Tabs con subrayado e indicador deslizante (sin dark mode).
 */
export default function FolderTabs({ className }: { className?: string }) {
  const { tabs, activeTabIndex } = useTabs();
  const { setActiveTabIndex } = useTabsActions();

  const listRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  // mantener longitud de refs
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

  // Recalcular cuando cambia el activo realmente
  useEffect(() => {
    updateIndicatorFor(activeTabIndex);
  }, [activeTabIndex, updateIndicatorFor]);

  // Recalcular en resize
  useEffect(() => {
    const onResize = () => updateIndicatorFor(activeTabIndex);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeTabIndex, updateIndicatorFor]);

  // teclado con roving tabindex
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
        >
          {t.label}
        </TabTrigger>
      ))}
    </div>
  );
}
