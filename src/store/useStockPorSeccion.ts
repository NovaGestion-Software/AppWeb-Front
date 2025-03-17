import { TablaStocks } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type StockPorSeccionProps = {
  status: 'error' | 'idle' | 'pending' | 'success' | null;
  // MODAL PARA SELECCION DE SECCION Y RUBRO
  seccionesSeleccionadas: { [key: string]: boolean } | null;
  rubrosSeleccionados: string[];
  seccionesToFetch: { [key: string]: boolean } | null;
  rubrosToFetch: string[];
  setSeccionesSeleccionadas: (data: { [key: string]: boolean }) => void;
  setRubrosSeleccionados: (rubros: string[]) => void;
  setSeccionesToFetch: (data: { [key: string]: boolean }) => void;
  setRubrosToFetch: (rubros: string[]) => void;
  clearSeccionesSeleccionadas: () => void;
  clearRubrosSeleccionados: () => void;
  clearSeccionesFetch: () => void;
  clearRubrosFetch: () => void;

  // TABLA STOCK
  tablaStock: TablaStocks[];
  setTablaStock: (data: TablaStocks[]) => void;

  //BUSQUEDA TABLA STOCK
  indiceSeleccionado: number;
  idsCoincidentes: (string | number)[];
  setIndiceSeleccionado: (indice: number) => void;
  setIdsCoincidentes: (ids: (string | number)[]) => void;

  // MARCAS MODAL
  marcasDisponibles: string[];
  marcasSeleccionadas: string[];
  setMarcasDisponibles: (data: string[]) => void;
  setMarcasSeleccionadas: (data: string[]) => void;
  clearMarcasSeleccionadas: () => void;
  // TEMPORADAS MODAL
  temporadasDisponibles: string[];
  temporadasSeleccionadas: string[];
  setTemporadasDisponibles: (data: string[]) => void;
  setTemporadasSeleccionadas: (data: string[]) => void;
  clearTemporadasSeleccionadas: () => void;

  // DEPOSITO MODAL
  depositosDisponibles: string[];
  depositosSeleccionadas: string[];
  setDepositosDisponibles: (data: string[]) => void;
  setDepositosSeleccionadas: (data: string[]) => void;
  clearDepositosSeleccionadas: () => void;

  // busqueda
  buscado: boolean;
  setBuscado: (valor: boolean) => void;

  setStatus: (status: 'error' | 'idle' | 'pending' | 'success' | null) => void;
};

export const useStockPorSeccion = create<StockPorSeccionProps>()(
  persist(
    (set) => ({
      status: 'idle',

      seccionesSeleccionadas: null,
      rubrosSeleccionados: [],
      seccionesToFetch: null,
      rubrosToFetch: [],
      setSeccionesSeleccionadas: (data) => set({ seccionesSeleccionadas: data }),
      setRubrosSeleccionados: (data) => set({ rubrosSeleccionados: data }),
      setSeccionesToFetch: (data) => set({ seccionesToFetch: data }),
      setRubrosToFetch: (data) => set({ rubrosToFetch: data }),
      setStatus: (status) => set({ status }),
      clearSeccionesSeleccionadas: () => set({ seccionesSeleccionadas: null }),
      clearRubrosSeleccionados: () => set({ rubrosSeleccionados: [] }),
      clearSeccionesFetch: () => set({ seccionesToFetch: null }),
      clearRubrosFetch: () => set({ rubrosToFetch: [] }),
      // TABLA STOCK
      tablaStock: [] as TablaStocks[],
      setTablaStock: (data: TablaStocks[]) => set({ tablaStock: data }),

      // BUSQUEDA TABLA STOCK
      indiceSeleccionado: 0,
      idsCoincidentes: [],

      // Funciones para actualizar los estados
      setIndiceSeleccionado: (indice) => set({ indiceSeleccionado: indice }),
      setIdsCoincidentes: (ids) => set({ idsCoincidentes: ids }),

      // Marcas Modal
      marcasDisponibles: [],
      setMarcasDisponibles: (marca) => set({ marcasDisponibles: marca }),
      marcasSeleccionadas: [],
      setMarcasSeleccionadas: (data: string[]) => set({ marcasSeleccionadas: data }),
      clearMarcasSeleccionadas: () => set({ marcasSeleccionadas: [] }),

      // Temporadas Modal
      temporadasDisponibles: [],
      setTemporadasDisponibles: (temporada) => set({ temporadasDisponibles: temporada }),
      temporadasSeleccionadas: [],
      setTemporadasSeleccionadas: (data: string[]) => set({ temporadasSeleccionadas: data }),
      clearTemporadasSeleccionadas: () => set({ temporadasSeleccionadas: [] }),

      //Depositos Modal
      depositosDisponibles: [],
      setDepositosDisponibles: (deposito) => set({ depositosDisponibles: deposito }),
      depositosSeleccionadas: [],
      setDepositosSeleccionadas: (data: string[]) => set({ depositosSeleccionadas: data }),
      clearDepositosSeleccionadas: () => set({ depositosSeleccionadas: [] }),

      //busqueda
      buscado: false, // Valor inicial
      setBuscado: (valor) => set({ buscado: valor }),
    }),
    {
      name: 'stock-xseccion-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
