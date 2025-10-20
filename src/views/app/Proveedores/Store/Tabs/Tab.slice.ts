import type { StateCreator } from "zustand";
export type TabId = "comerciales" | "impositivos" | "formaPago" ;

export const PROVEEDORES_TABS: { id: TabId; label: string }[] = [
  { id: "comerciales", label: "Datos Comerciales" },
  { id: "impositivos", label: "Datos Impositivos" },
  { id: "formaPago", label: "Forma de Pago" },

];
// /Proovedores/Data/tabs.types.ts
export type TabsSlice = {
  /** Índice de la solapa activa (0..n-1). */
  activeTabIndex: number;
  /** Id semántico de la solapa activa (sincronizado con el índice). */
  activeTabId: string;
  /** Lista de solapas disponibles. */
  tabs: { id: string; label: string }[];

  /** Cambia por índice (clamp interno). */
  setActiveTabIndex: (i: number) => void;
  /** Cambia por id (si no existe, no hace nada). */
  setActiveTabId: (id: string) => void;

  /** Helpers de navegación. */
  goNextTab: () => void;
  goPrevTab: () => void;

  /** Restablece el estado de tabs al inicial. */
  resetTabs: () => void;
};




/**
 * Slice responsable del estado y navegación de solapas.
 * Esta función es pura y composable: no conoce el resto del store.
 */
export const createTabsSlice: StateCreator<
  TabsSlice,
  [["zustand/devtools", never]] | [],
  [],
  TabsSlice
> = (set, get) => {
  const initialTabs = PROVEEDORES_TABS;
  const initialId = initialTabs[0]?.id ?? "default";

  return {
    // estado
    tabs: initialTabs,
    activeTabIndex: 0,
    activeTabId: initialId,

    // actions
    setActiveTabIndex: (i) =>
      set((state) => {
        const max = state.tabs.length - 1;
        const clamped = Math.max(0, Math.min(i, max));
        const id = state.tabs[clamped]?.id ?? state.activeTabId;
        return { activeTabIndex: clamped, activeTabId: id };
      }),

    setActiveTabId: (id) =>
      set((state) => {
        const idx = state.tabs.findIndex((t) => t.id === id);
        if (idx === -1) return {};
        return { activeTabIndex: idx, activeTabId: id };
      }),

    goNextTab: () => {
      const { activeTabIndex, tabs } = get();
      const next = (activeTabIndex + 1) % Math.max(1, tabs.length);
      get().setActiveTabIndex(next);
    },

    goPrevTab: () => {
      const { activeTabIndex, tabs } = get();
      const prev = (activeTabIndex - 1 + Math.max(1, tabs.length)) % Math.max(1, tabs.length);
      get().setActiveTabIndex(prev);
    },

    resetTabs: () =>
      set(() => ({
        tabs: initialTabs,
        activeTabIndex: 0,
        activeTabId: initialId,
      })),
  };
};
