import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { VentaPorVendedorColumns } from "../data";
import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { createFiltrosSucursalesStore, FiltrosSucursalesStore } from "@/utils/helpers/FiltrosSucursales/FiltrosSucursalesStore";
import { createBusquedaBaseStore } from "@/utils/helpers/Busqueda/BusquedaBaseStore";
import { BusquedaState } from "@/frontend-resourses/components/Tables/Busqueda/types";

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
      setVentasPorVendedor: (data: VentaPorVendedorColumns[]) => set({ ventasPorVendedor: data }),
      clearVentasPorVendedor: () => set({ ventasPorVendedor: [] }),

      //Footer
      ventasPorVendedorFooter: [],
      setVentasPorVendedorFooter: (dataFooter: VentaPorVendedorColumns[]) => set({ ventasPorVendedorFooter: dataFooter }),
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
