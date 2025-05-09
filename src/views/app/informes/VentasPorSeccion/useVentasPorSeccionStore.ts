import { FechasRango, ResVentasPorSeccion, Status, SucursalesModal } from '@/types';
import dayjs from 'dayjs';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const defaultDate = {
  from: dayjs().startOf('month'),
  to: dayjs(),
};

type VentasPorSeccionProps = {
  // parametros
  fechas: FechasRango;
  clearFechas: () => void;
  setFechas: (data: FechasRango) => void;
  // status
  status: Status;
  setStatus: (status: Status) => void;
  //data
  ventasPorSeccion: ResVentasPorSeccion[] | null;
  setVentasPorSeccion: (data: ResVentasPorSeccion[]) => void;
  clearVentasPorSeccion: () => void;

  //secciones:

  secciones: any[];
  setSecciones: (data: any[]) => void;

  // filtros
  sucursalesSeleccionadas: SucursalesModal[];
  sucursalesDisponibles: SucursalesModal[];
  setSucursalesSeleccionadas: (sucursales: SucursalesModal[]) => void;
  setSucursalesDisponibles: (sucursales: SucursalesModal[]) => void;
  clearSucursalesSeleccionadas: () => void;
  clearSucursalesDisponibles: () => void;
  // busqueda
  buscado: boolean;
  setBuscado: (valor: boolean) => void;
  navegandoCoincidentes: boolean;
  setNavegandoCoincidentes: (valor: boolean) => void;
  modoNavegacion: 'normal' | 'busqueda';
  ultimoIndiceBusqueda: number | null;
  setModoNavegacion: (modo: 'normal' | 'busqueda') => void;
  setUltimoIndiceBusqueda: (index: number | null) => void;

  indiceBusqueda: number; // Índice para navegación en resultados (0 a idsCoincidentes.length - 1)
  indiceGlobal: number; // Índice para navegación global (0 a productos.length - 1)
  setIndiceBusqueda: (index: number) => void;
  setIndiceGlobal: (index: number) => void;

  indiceSeleccionado: number | null;
  idsCoincidentes: (string | number)[];
  setIndiceSeleccionado: (indice: number | null) => void;
  setIdsCoincidentes: (ids: (string | number)[]) => void;
};

export const useVentasPorSeccionStore = create<VentasPorSeccionProps>()(
  persist(
    (set) => ({
      //parametros
      fechas: { from: defaultDate.from, to: defaultDate.to },
      setFechas: (data) => set({ fechas: data }),
      clearFechas: () => set({ fechas: { from: '', to: '' } }),
      // status
      status: 'idle',
      setStatus: (status) => set({ status }),
      //data
      ventasPorSeccion: null,
      setVentasPorSeccion: (data) => set({ ventasPorSeccion: data }),
      clearVentasPorSeccion: () => set({ ventasPorSeccion: null }),

      // secciones
      secciones: [] as any[],
      setSecciones: (data: any[]) => set({ secciones: data }),

      // filtros
      sucursalesSeleccionadas: [],
      sucursalesDisponibles: [],
      setSucursalesSeleccionadas: (sucursales) => set({ sucursalesSeleccionadas: sucursales }),
      setSucursalesDisponibles: (sucursales) => set({ sucursalesDisponibles: sucursales }),
      clearSucursalesSeleccionadas: () => set({ sucursalesSeleccionadas: [] }),
      clearSucursalesDisponibles: () => set({ sucursalesDisponibles: [] }),

      //busqueda
      buscado: false, // Valor inicial
      setBuscado: (valor) => set({ buscado: valor }),
      navegandoCoincidentes: false, // Valor inicial
      setNavegandoCoincidentes: (valor) =>
        set({
          navegandoCoincidentes: valor,
          modoNavegacion: valor ? 'busqueda' : 'normal',
        }),
      indiceBusqueda: 0,
      indiceGlobal: 0,
      setIndiceBusqueda: (index) => set({ indiceBusqueda: index }),
      setIndiceGlobal: (index) => set({ indiceGlobal: index }),
      modoNavegacion: 'normal',
      ultimoIndiceBusqueda: 0, // Para recordar la posición en resultados de búsqueda
      setModoNavegacion: (modo) => set({ modoNavegacion: modo }),
      setUltimoIndiceBusqueda: (index) => set({ ultimoIndiceBusqueda: index }),
      // // BUSQUEDA TABLA STOCK
      indiceSeleccionado: 0,
      idsCoincidentes: [],

      // Funciones para actualizar los estados
      setIndiceSeleccionado: (indice) => set({ indiceSeleccionado: indice }),
      setIdsCoincidentes: (ids) => set({ idsCoincidentes: ids }),
    }),
    {
      name: 'ventas-seccion-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
