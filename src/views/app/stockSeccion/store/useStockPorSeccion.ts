// import { TablaStock1, TablaStocks } from '@/types';
import { CheckboxState, DepositoModal,  MarcaModal, ProductoAgrupado, Status, TablaSecciones } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type StockPorSeccionProps = {
  status: Status;
  // MODAL PARA SELECCION DE SECCION Y RUBRO
  footer: boolean;
  setFooter: (footer: boolean) => void; // El setter para cambiar el estado de `footer`
  datosRubros: TablaSecciones[];
  setDatosRubros: (data: TablaSecciones[]) => void;

  seccionesSeleccionadas: { [key: string]: boolean } | null;
  setSeccionesSeleccionadas: (data: { [key: string]: boolean }) => void;

  seccionesTraidas: { [key: string]: boolean } | null;
  setSeccionesTraidas: (data: { [key: string]: boolean }) => void;

  // rubros
  rubrosSeleccionados: string[];
  setRubrosSeleccionados: (rubros: string[]) => void;
  // rubros pendientes
  rubrosPendientes: string[];
  setRubrosPendientes: (rubros: string[]) => void;
  // rubros pendientes Data
  rubrosPendientesData: { id: string; nombre: string }[];
  setRubrosPendientesData: (data: { id: string; nombre: string }[] | ((prev: { id: string; nombre: string }[]) => { id: string; nombre: string }[])) => void;

  // rubros Traidos
  rubrosTraidos: string[];
  setRubrosTraidos: (rubros: string[]) => void;
  // rubros Traidos Data
  rubrosTraidosData: { id: string; nombre: string }[];
  setRubrosTraidosData: (data: { id: string; nombre: string }[]) => void;

  clearSeccionesSeleccionadas: () => void;
  clearRubrosSeleccionados: () => void;
  clearSeccionesTraidas: () => void;
  clearRubrosTraidos: () => void;
  clearRubrosPendientes: () => void;
  clearRubrosTraidosData: () => void;
  clearRubrosPendientesData: () => void;

  // TABLA STOCK
  tipoPrecio: 'prec1' | 'prec2' | 'prec3'; // Tipo de precio seleccionado (CONTADO, LISTA 2, LISTA 3)
  setTipoPrecio: (tipo: 'prec1' | 'prec2' | 'prec3') => void; // Setter para el tipo de precio

  // tabla stock como la informacion despues de la peticion, y tabla renderizada como la informacion ordenada
  tablaStock: any[];
  setTablaStock: (data: any[]) => void;

  stockRenderizado: any[];
  setStockRenderizado: (data: any[]) => void;

  productos: ProductoAgrupado[];
  setProductos: (data: ProductoAgrupado[]) => void;

  //BUSQUEDA TABLA STOCK
  // Indice seleccionado para la tabla stock
  indiceSeleccionado: number | null;
  idsCoincidentes: (string | number)[];
  setIndiceSeleccionado: (indice: number | null) => void;
  setIdsCoincidentes: (ids: (string | number)[]) => void;

  // RE ORDENAMIENTO DE STOCK
  checkboxSeleccionados: CheckboxState;
  setCheckboxSeleccionados: (grupo: keyof CheckboxState, value: string | null) => void;

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
  ultimoIndiceBusqueda: number | null;
  setModoNavegacion: (modo: 'normal' | 'busqueda') => void;
  setUltimoIndiceBusqueda: (index: number | null) => void;

  indiceBusqueda: number; // Índice para navegación en resultados (0 a idsCoincidentes.length - 1)
  indiceGlobal: number; // Índice para navegación global (0 a productos.length - 1)
  setIndiceBusqueda: (index: number) => void;
  setIndiceGlobal: (index: number) => void;

  setStatus: (status: 'error' | 'idle' | 'pending' | 'success' | null) => void;
  resetStore: () => void;

};

export const useStockPorSeccion = create<StockPorSeccionProps>()(
  persist(
    (set) => ({
      status: 'pending',
      footer: true,
      setFooter: (footer: boolean) => set({ footer }),
      datosRubros: [],
      setDatosRubros: (data: TablaSecciones[]) => set({ datosRubros: data }),
      seccionesSeleccionadas: null,
      seccionesTraidas: null,

      rubrosSeleccionados: [],
      rubrosTraidos: [],
      rubrosPendientes: [],
      setRubrosPendientes: (data) => set({ rubrosPendientes: data }),
      setSeccionesSeleccionadas: (data) => set({ seccionesSeleccionadas: data }),
      setRubrosSeleccionados: (data) => set({ rubrosSeleccionados: data }),
      setRubrosTraidos: (data) => set({ rubrosTraidos: data }),

      rubrosTraidosData: [],
      setRubrosTraidosData: (data) => set({ rubrosTraidosData: data }),
      rubrosPendientesData: [],
      setRubrosPendientesData: (data) =>
        set((state) => ({
          rubrosPendientesData: typeof data === 'function' ? data(state.rubrosPendientesData) : data,
        })),

      setSeccionesTraidas: (data) => set({ seccionesTraidas: data }),
      setStatus: (status) => set({ status }),
      clearSeccionesSeleccionadas: () => set({ seccionesSeleccionadas: null }),
      clearRubrosSeleccionados: () => set({ rubrosSeleccionados: [] }),

      clearSeccionesTraidas: () => set({ seccionesTraidas: null }),

      clearRubrosTraidos: () => set({ rubrosTraidos: [] }),
      clearRubrosPendientes: () => set({ rubrosPendientes: [] }),

      clearRubrosTraidosData: () => set({ rubrosTraidosData: [] }),
      clearRubrosPendientesData: () => set({ rubrosPendientesData: [] }),
      // TABLA STOCK
      tablaStock: [] as any[],
      setTablaStock: (data: any[]) => set({ tablaStock: data }),
      stockRenderizado: [] as any[],
      setStockRenderizado: (data: any[]) => set({ stockRenderizado: data }),
      tipoPrecio: 'prec1', // Valor inicial
      setTipoPrecio: (tipo: 'prec1' | 'prec2' | 'prec3') => set({ tipoPrecio: tipo }),
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
        grupo1: 'Todos',
        grupo2: 'Todos',
        grupo3: 'CONTADO',
        grupo4: 'Codigo',
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
      setMarcasSeleccionadas: (data: MarcaModal[]) => set({ marcasSeleccionadas: data }),
      clearMarcasSeleccionadas: () => set({ marcasSeleccionadas: [] }),

      // Temporadas Modal
      temporadasDisponibles: [],
      setTemporadasDisponibles: (temporada) => set({ temporadasDisponibles: temporada }),
      temporadasSeleccionadas: [],
      setTemporadasSeleccionadas: (data: string[]) => set({ temporadasSeleccionadas: data }),
      clearTemporadasSeleccionadas: () => set({ temporadasSeleccionadas: [] }),

      // Depositos Modal
      depositosDisponibles: [],
      setDepositosDisponibles: (depositos: DepositoModal[]) => set({ depositosDisponibles: depositos }),
      depositosSeleccionados: [],
      setDepositosSeleccionados: (data: DepositoModal[]) => set({ depositosSeleccionados: data }),
      clearDepositosSeleccionadas: () => set({ depositosSeleccionados: [] }),

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
      resetStore: () =>
        set((_state) => ({
          buscado: false,
          idsCoincidentes: [],
          tablaStock: [],
          productos: [],
          stockRenderizado: [],
          seccionesSeleccionadas: {},
          seccionesTraidas: {},
          rubrosSeleccionados: [],
          rubrosTraidos: [],
          rubrosPendientes: [],
          status: 'idle',
          footer: false,
          marcasDisponibles: [],
          marcasSeleccionadas: [],
          temporadasDisponibles: [],
          temporadasSeleccionadas: [],
          depositosDisponibles: [],
          depositosSeleccionados: [],
          rubrosTraidosData: [],
          rubrosPendientesData: [],
          checkboxSeleccionados: {
            grupo1: null,
            grupo2: null,
            grupo3: null,
            grupo4: null,
          },
        })),
      

      // Funciones para actualizar los estados - REEMPLAZO
      // setIndiceSeleccionado: (indice) => set({ indiceSeleccionado: indice }), // <-- Eliminar
      setIndiceBusqueda: (index) => set({ indiceBusqueda: index }),
      setIndiceGlobal: (index) => set({ indiceGlobal: index }),
      modoNavegacion: 'normal',
      ultimoIndiceBusqueda: 0, // Para recordar la posición en resultados de búsqueda
      setModoNavegacion: (modo) => set({ modoNavegacion: modo }),
      setUltimoIndiceBusqueda: (index) => set({ ultimoIndiceBusqueda: index }),
    }),
    {
      name: 'stock-xseccion-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
