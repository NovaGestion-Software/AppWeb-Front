import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { VentaPorVendedorColumns } from "../data";
import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { createFiltrosSucursalesStore, FiltrosSucursalesStore } from "@/utils/helpers/FiltrosSucursales/FiltrosSucursalesStore";
import { BusquedaState, createBusquedaBaseStore } from "@/utils/helpers/Busqueda/BusquedaBaseStore";

type DetalleVenedoresStore = BaseStore &
  FiltrosSucursalesStore &
  BusquedaState & {
    //data
    ventasPorVendedor: VentaPorVendedorColumns[];
    setVentasPorVendedor: (data: VentaPorVendedorColumns[]) => void;
    clearVentasPorVendedor: () => void;

    //data
    ventasPorVendedorFooter: VentaPorVendedorColumns[];
    setVentasPorVendedorFooter: (dataFooter: VentaPorVendedorColumns[]) => void;
    clearVentasPorVendedorFooter: () => void;
    //secciones:
    secciones: any[];
    setSecciones: (data: any[]) => void;
  };

export const useDetallesVentasPorVendedorStore = create<DetalleVenedoresStore>()(
  persist(
    (set, get) => ({
      // Composición base
      ...createBaseStore(set, get),
      ...createFiltrosSucursalesStore(set),
      ...createBusquedaBaseStore(set),

      //data
      ventasPorVendedor: [],
      setVentasPorVendedor: (data) => set({ ventasPorVendedor: data }),
      clearVentasPorVendedor: () => set({ ventasPorVendedor: [] }),

      //Footer
      ventasPorVendedorFooter: [],
      setVentasPorVendedorFooter: (dataFooter) => set({ ventasPorVendedorFooter: dataFooter }),
      clearVentasPorVendedorFooter: () => set({ ventasPorVendedorFooter: [] }),

      // secciones
      secciones: [] as any[],
      setSecciones: (data: any[]) => set({ secciones: data }),
    }),
    {
      name: "detalles-ventas-vendedor-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
