import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import dayjs from "dayjs";
import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { Sucursal } from "@/types";


type VentasHoraStore = BaseStore & {
  ventasPorHora: Sucursal[] | null;
  setVentasPorHora: (data: Sucursal[]) => void;
  clearVentasPorHora: () => void;

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
