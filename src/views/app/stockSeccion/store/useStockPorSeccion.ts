// import { TablaStock1, TablaStocks } from '@/types';
import { DepositoModal, MarcaModal, ProductoAgrupado, Status } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CheckboxState {
  grupo1: string | null; // Talles o Artículos
  grupo2: string | null; // Stock (Con Stock, Todos, Negativos)
  grupo3: string | null; // Listas (CONTADO, LISTA 2, LISTA 3)
  grupo4: string | null; // Ordenar (Código, Marca, Descripción)
}

type StockPorSeccionProps = {
  status: Status;
  // MODAL PARA SELECCION DE SECCION Y RUBRO
  footer: boolean;
  setFooter: (footer: boolean) => void; // El setter para cambiar el estado de `footer`

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
  // tabla stock como la informacion despues de la peticion, y tabla renderizada como la informacion ordenada
  // el tema es que despues de data renderizada sea vacia como va a volver a llenarse?
  tablaStock: any[];
  setTablaStock: (data: any[]) => void;

  stockRenderizado: any[];
  setStockRenderizado: (data: any[]) => void;

  productos: ProductoAgrupado[];
  setProductos: (data: ProductoAgrupado[]) => void;

  //BUSQUEDA TABLA STOCK
  indiceSeleccionado: number;
  idsCoincidentes: (string | number)[];
  setIndiceSeleccionado: (indice: number) => void;
  setIdsCoincidentes: (ids: (string | number)[]) => void;

  // RE ORDENAMIENTO DE STOCK
  checkboxSeleccionados: CheckboxState;
  setCheckboxSeleccionados: (
    grupo: keyof CheckboxState,
    value: string | null
  ) => void;

  // MARCAS MODAL
  marcasDisponibles: MarcaModal[];
  marcasSeleccionadas: MarcaModal[];
  setMarcasDisponibles: (data: MarcaModal[]) => void;
  setMarcasSeleccionadas: (data: MarcaModal[]) => void;
  clearMarcasSeleccionadas: () => void;
  // TEMPORADAS MODAL
  temporadasDisponibles: string[];
  temporadasSeleccionadas: string[];
  setTemporadasDisponibles: (data: string[]) => void;
  setTemporadasSeleccionadas: (data: string[]) => void;
  clearTemporadasSeleccionadas: () => void;

  // DEPOSITO MODAL
  depositosDisponibles: DepositoModal[];
  depositosSeleccionados: DepositoModal[];
  setDepositosDisponibles: (data: DepositoModal[]) => void;
  setDepositosSeleccionados: (data: DepositoModal[]) => void;
  clearDepositosSeleccionadas: () => void;

  // busqueda
  buscado: boolean;
  setBuscado: (valor: boolean) => void;
  navegandoCoincidentes: boolean;
  setNavegandoCoincidentes: (valor: boolean) => void;
  modoNavegacion: 'normal' | 'busqueda';
  ultimoIndiceBusqueda: number;
  setModoNavegacion: (modo: 'normal' | 'busqueda') => void;
  setUltimoIndiceBusqueda: (index: number) => void;

  indiceBusqueda: number;      // Índice para navegación en resultados (0 a idsCoincidentes.length - 1)
  indiceGlobal: number;        // Índice para navegación global (0 a productos.length - 1)
  setIndiceBusqueda: (index: number) => void;
  setIndiceGlobal: (index: number) => void;

  setStatus: (status: "error" | "idle" | "pending" | "success" | null) => void;
};

export const useStockPorSeccion = create<StockPorSeccionProps>()(
  persist(
    (set) => ({
      status: "idle",
      footer: true,
      setFooter: (footer: boolean) => set({ footer }),
      seccionesSeleccionadas: null,
      rubrosSeleccionados: [],
      seccionesToFetch: null,
      rubrosToFetch: [],
      setSeccionesSeleccionadas: (data) =>
        set({ seccionesSeleccionadas: data }),
      setRubrosSeleccionados: (data) => set({ rubrosSeleccionados: data }),
      setSeccionesToFetch: (data) => set({ seccionesToFetch: data }),
      setRubrosToFetch: (data) => set({ rubrosToFetch: data }),
      setStatus: (status) => set({ status }),
      clearSeccionesSeleccionadas: () => set({ seccionesSeleccionadas: null }),
      clearRubrosSeleccionados: () => set({ rubrosSeleccionados: [] }),
      clearSeccionesFetch: () => set({ seccionesToFetch: null }),
      clearRubrosFetch: () => set({ rubrosToFetch: [] }),
      // TABLA STOCK
      tablaStock: [] as any[],
      setTablaStock: (data: any[]) => set({ tablaStock: data }),
      stockRenderizado: [] as any[],
      setStockRenderizado: (data: any[]) => set({ stockRenderizado: data }),

      productos: [] as ProductoAgrupado[],
      setProductos: (data: ProductoAgrupado[]) => set({ productos: data }),

      // // BUSQUEDA TABLA STOCK
      indiceSeleccionado: 0,
      idsCoincidentes: [],

      // Funciones para actualizar los estados
      setIndiceSeleccionado: (indice) => set({ indiceSeleccionado: indice }),
      setIdsCoincidentes: (ids) => set({ idsCoincidentes: ids }),

      // RE ORDENAMIENTO STOCK
      checkboxSeleccionados: {
        grupo1: "Talles",
        grupo2: "Todos",
        grupo3: "CONTADO",
        grupo4: "Descripción",
      },
      setCheckboxSeleccionados: (grupo, value) =>
        set((state) => ({
          checkboxSeleccionados: {
            ...state.checkboxSeleccionados,
            [grupo]: value,
          },
        })),

      // Marcas Modal
      marcasDisponibles: [],
      setMarcasDisponibles: (marca) => set({ marcasDisponibles: marca }),
      marcasSeleccionadas: [],
      setMarcasSeleccionadas: (data: MarcaModal[]) =>
        set({ marcasSeleccionadas: data }),
      clearMarcasSeleccionadas: () => set({ marcasSeleccionadas: [] }),

      // Temporadas Modal
      temporadasDisponibles: [],
      setTemporadasDisponibles: (temporada) =>
        set({ temporadasDisponibles: temporada }),
      temporadasSeleccionadas: [],
      setTemporadasSeleccionadas: (data: string[]) =>
        set({ temporadasSeleccionadas: data }),
      clearTemporadasSeleccionadas: () => set({ temporadasSeleccionadas: [] }),

      // Depositos Modal
      depositosDisponibles: [],
      setDepositosDisponibles: (depositos: DepositoModal[]) =>
        set({ depositosDisponibles: depositos }),
      depositosSeleccionados: [],
      setDepositosSeleccionados: (data: DepositoModal[]) =>
        set({ depositosSeleccionados: data }),
      clearDepositosSeleccionadas: () => set({ depositosSeleccionados: [] }),

      //busqueda
      buscado: false, // Valor inicial
      setBuscado: (valor) => set({ buscado: valor }),
      navegandoCoincidentes: false, // Valor inicial
      setNavegandoCoincidentes: (valor) => set({ 
        navegandoCoincidentes: valor,
        modoNavegacion: valor ? 'busqueda' : 'normal'
      }),
      indiceBusqueda: 0,
      indiceGlobal: 0,
      
      // Funciones para actualizar los estados - REEMPLAZO
      // setIndiceSeleccionado: (indice) => set({ indiceSeleccionado: indice }), // <-- Eliminar
      setIndiceBusqueda: (index) => set({ indiceBusqueda: index }),
      setIndiceGlobal: (index) => set({ indiceGlobal: index }),
      modoNavegacion: "normal",
      ultimoIndiceBusqueda: 0, // Para recordar la posición en resultados de búsqueda
      setModoNavegacion: (modo) => set({ modoNavegacion: modo }),
setUltimoIndiceBusqueda: (index) => set({ ultimoIndiceBusqueda: index }),
    }),
    {
      name: "stock-xseccion-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
