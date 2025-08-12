import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { createBaseStore, BaseStore } from "@/utils/helpers/BaseStore";
import { createFiltrosSucursalesStore, FiltrosSucursalesStore } from "@/utils/helpers/FiltrosSucursales/FiltrosSucursalesStore";

import { Sucursal } from "@/types";

type Totales1 = Record<string, number>;

type VentasHoraStore = BaseStore &
  FiltrosSucursalesStore & {
    ventasPorHora: Sucursal[] | null;
    setVentasPorHora: (data: Sucursal[]) => void;
    clearVentasPorHora: () => void;

    filas: any[] | null;
    setFilas: (data: any[]) => void;
    clearFilas: () => void;

    totales: Totales1 | null;
    setTotales: (data: Totales1) => void;
    clearTotales: () => void;

    resetStore: () => void;
  };

export const useVentasHoraStore = create<VentasHoraStore>()(
  persist(
    (set, get) => ({
      // Composición base
      ...createBaseStore(set, get),
      ...createFiltrosSucursalesStore(set),

      // Estado específico
      ventasPorHora: null,
      setVentasPorHora: (data) => set({ ventasPorHora: data }),
      clearVentasPorHora: () => set({ ventasPorHora: null }),

      filas: null,
      setFilas: (data) => set({ filas: data }),
      clearFilas: () => set({ filas: null }),

      totales: null,
      setTotales: (data) => set({ totales: data }),
      clearTotales: () => set({ totales: null }),

      // Reset total usando los resets de los módulos
      resetStore: () => {
        get().resetBaseStore();
        get().resetFiltrosSucursal();

        set({
          ventasPorHora: null,
          filas: null,
          totales: null,
        });
      },
    }),
    {
      name: "ventas-hora-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        sucursalesSeleccionadas: state.sucursalesSeleccionadas,
        sucursalesDisponibles: state.sucursalesDisponibles,
      }),
    }
  )
);
