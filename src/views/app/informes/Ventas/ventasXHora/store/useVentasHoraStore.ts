import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import dayjs from "dayjs";
import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { Sucursal } from "@/types";

// Agregamos un tipo para totales si no existe aún:
// type TotalesVentas = {
//   cantidad: number;
//   pares: number;
//   importe: number;
// };

type Totales1 = Record<string, number>;
type VentasHoraStore = BaseStore & {
  ventasPorHora: Sucursal[] | null;
  setVentasPorHora: (data: Sucursal[]) => void;
  clearVentasPorHora: () => void;

  filas: any[] | null;
  setFilas: (data: any[]) => void;
  clearFilas: () => void;

  totales: Totales1 | null;
  setTotales: (data: Totales1) => void;
  clearTotales: () => void;

  showSucursales: boolean;
  setShowSucursales: (value: boolean) => void;

  resetStore: () => void;
};

export const useVentasHoraStore = create<VentasHoraStore>()(
  persist(
    (set) => ({
      ...createBaseStore<VentasHoraStore>(set),

      ventasPorHora: null,
      setVentasPorHora: (data) => set({ ventasPorHora: data }),
      clearVentasPorHora: () => set({ ventasPorHora: null }),

      filas: null,
      setFilas: (data) => set({ filas: data }),
      clearFilas: () => set({ filas: null }),

      totales: null,
      setTotales: (data) => set({ totales: data }),
      clearTotales: () => set({ totales: null }),

      showSucursales: false,
      setShowSucursales: (value) => set({ showSucursales: value }),

      resetStore: () =>
        set(() => ({
          id: "",
          status: "idle",
          estaProcesado: false,
          fechas: { from: dayjs().startOf("month"), to: dayjs() },
          fecha: { from: dayjs().startOf("month"), to: dayjs() },
          ventasPorHora: null,
          filas: null,
          totales: null,
          sucursalesSeleccionadas: [],
          sucursalesDisponibles: [],
          foco: false,
          footer: false,
          showSucursales: false,
        })),
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
