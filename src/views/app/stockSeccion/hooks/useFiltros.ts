import {
  CheckboxState,
  DepositoModal,
  FiltroModal,
  MarcaModal,
  Precios,
  ProductoAgrupado,
} from "@/types";
import { useStockPorSeccion } from "@/views/app/stockSeccion/store/useStockPorSeccion";
import { formatPrice } from "../utils/formatPrice";

// props use filtros
type PropsFiltros = {
  stockRenderizado: any[];
  stateFiltros: CheckboxState;
  filtrarStock?: {
    grupo: string | null;
  };
  filtradoSimple?: {
    itemsDisponibles: string[];
    key?: string | undefined;
  };
  filtradoComplejo?: {
    itemsDisponibles: string[];
    claveDepositos?: string | undefined;
    itemsSeleccionados?: string[];
  };
  listaPrecios?: {
    grupo: string | null
  };
};

export const useFiltros = () => {


  // funcion para aplicar los filtros: stock, marca, deposito, lista.
  const aplicarFiltros = (props: PropsFiltros) => {
    const { stockRenderizado, filtrarStock, filtradoSimple, filtradoComplejo, stateFiltros, listaPrecios } =  props;
    if (!Array.isArray(stockRenderizado)) return [];

    let resultado = stockRenderizado;
    if (filtrarStock?.grupo) {
      resultado = filtrarPorStock(resultado, filtrarStock.grupo);
    }
    if (filtradoSimple?.itemsDisponibles?.length) {
   resultado = filtrarPorMarcas(
        resultado,
        filtradoSimple.key,
        filtradoSimple.itemsDisponibles,
      );
    }

    if (filtradoComplejo?.itemsDisponibles?.length) {
      resultado = filtrarPorDepositos(
        resultado,
        filtradoComplejo.claveDepositos,
        filtradoComplejo.itemsSeleccionados,
      );
    }

    if (listaPrecios?.grupo) {
      resultado = aplicarPrecioFormateado(resultado, listaPrecios.grupo);
    }
    // Solo aplicar agrupación si está en modo "Artículos"
    if (stateFiltros?.grupo1 === "Articulos") {
      return agruparPorArticulo(resultado);
    }
    return resultado;
  };

  // agrupar por articulo : Parece que no se puede modularizar facilmente.
  const agruparPorArticulo = (
    datos: ProductoAgrupado[]
  ): ProductoAgrupado[] => {
    const agrupados: Record<string, ProductoAgrupado> = {};

    datos.forEach((item) => {
      const clave = `${item.codigo}-${item.nmarca}-${item.descripcion}`;

      if (!agrupados[clave]) {
        agrupados[clave] = {
          ...item,
          talle: "", // o '' si prefieres vacío
          stockPorDeposito: { ...item.stockPorDeposito }, // Clonamos el stock por depósito
        };
      } else {
        // Sumar el stock total
        const totalActual = parseFloat(agrupados[clave].total) || 0;
        const totalNuevo = parseFloat(item.total) || 0;
        agrupados[clave].total = (totalActual + totalNuevo).toString();

        // Sumar stocks por depósito (como números)
        Object.entries(item.stockPorDeposito || {}).forEach(
          ([deposito, cantidadStr]) => {
            const cantidad = parseFloat(cantidadStr) || 0;
            const stockActual =
              parseFloat(
                agrupados[clave].stockPorDeposito[deposito]?.toString() || "0"
              ) || 0;
            agrupados[clave].stockPorDeposito[deposito] = (
              stockActual + cantidad
            ).toString();
          }
        );
      }
    });

    return Object.values(agrupados);
  };

  // si type es number ordena de menor a mayor, si es string ordena de menor a mayor
  const aplicarOrdenamiento = (
    datos: any[],
    checkboxSeleccionados: CheckboxState,
    ...criterios: { case: string; key: string; type: string }[]
  ) => {
    if (!Array.isArray(datos)) return [];

    const orden = checkboxSeleccionados?.grupo4;

    if (!orden) return [...datos];

    // Encuentra el criterio de ordenamiento basado en 'orden'
    const criterio = criterios.find((c) => c.case === orden);

    if (!criterio) return [...datos]; // Si no hay un criterio válido, devolver los datos sin cambios

    const { key, type } = criterio;

    return [...datos].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      if (type === "number") {
        // Si el tipo es número, realiza una comparación numérica
        const numA = Number(valueA) || 0;
        const numB = Number(valueB) || 0;
        return numA - numB; // Orden de menor a mayor
      } else if (type === "string") {
        // Si el tipo es string, realiza una comparación alfabética
        return (valueA || "").localeCompare(valueB || "", "es", {
          sensitivity: "base",
        }); //  Orden de menor a mayor
      }

      return 0; // Si el tipo no es reconocido, no hace nada
    });
  };

  return { aplicarFiltros, agruparPorArticulo, aplicarOrdenamiento };
};

//Funciones que utiliza :

// filtrar por valor del item.
function filtrarPorStock(datos: any[], tipo: string | null): any[] {
  if (!tipo) return datos;

  let datosFiltrados = [...datos];
  return datosFiltrados.filter((p) => {
    const total = parseFloat(p.total);
    if (tipo === "Con Stock" && total <= 0) return false;
    if (tipo === "Negativos" && total >= 0) return false;
    return true;
  });
};
// filtro nivel simple 
function filtrarPorMarcas(
  datos: any[],
  key: string| undefined,
  valoresPermitidos: string[],
): any[]{
  if (!valoresPermitidos.length) return datos;

  const valoresLower = valoresPermitidos.map((v) => v.toLowerCase());

  return datos.filter((p) =>
    key && valoresLower.includes((p[key] as string)?.toLowerCase())
  );
};
// filtro nivel complejo
function filtrarPorDepositos(
  datos: any[],
  itemsDisponibles: string  | undefined,
  itemsSeleccionados: string[] | undefined,
): any[]{
  if (!itemsSeleccionados?.length) return datos;

  return datos.filter((p) =>
    Object.entries(itemsDisponibles ? p[itemsDisponibles] || {} : {}).some(
      ([id]) => itemsSeleccionados.includes(id)
    )
  );
};
// obtener valor de key
function getPrecioKey(grupo3: string): keyof Precios {
  switch (grupo3) {
    case 'LISTA 2':
      return 'lista2';
    case 'LISTA 3':
      return 'lista3';
    default:
      return 'contado';
  }
};
// cambiar valor de key en columna
function aplicarPrecioFormateado(
  datos: ProductoAgrupado[],
  grupo3: string
): ProductoAgrupado[] {
  const key = getPrecioKey(grupo3);
  return datos.map(item => ({
    ...item,
    precio: formatPrice(item.precios[key]),
  }));
}

