import { ProductoAgrupado } from "@/types";
import { useStockPorSeccion } from "@/views/app/stockSeccion/store/useStockPorSeccion";

export const useFiltros = () => {
  const {
    checkboxSeleccionados,
    marcasSeleccionadas,
    depositosSeleccionados,
    stockRenderizado,
  } = useStockPorSeccion();


  // ResultadoFiltro devuelve el resultado de los filtros por stock y por tipo que interactuan con la original.
  // ResultadoOrdenamiento devuelve el resultado en base a lo renderizado en la
  //  tabla, productos.
  // Filtrar por marca y filtrar por deposito van sobre el stock original.

  
const aplicarFiltros = () => {
  if(!Array.isArray(stockRenderizado)) return [];

  let resultado = [...stockRenderizado].filter(p => {
    const total = parseFloat(p.total);
    
    if (checkboxSeleccionados?.grupo2 === "Con Stock" && total <= 0) return false;
    if (checkboxSeleccionados?.grupo2 === "Negativos" && total >= 0) return false;
    
   
    return true;
  });

  if(marcasSeleccionadas?.length) {
    const marcas = marcasSeleccionadas.map((m) => m.nmarca.toLowerCase());
    resultado = resultado.filter((p) => marcas.includes(p.nmarca.toLowerCase()));
  }
  if(depositosSeleccionados?.length) {
    const depositos = depositosSeleccionados.map((d) => d.deposito);
    resultado = resultado.filter((p) =>
       Object.entries(p.stockPorDeposito || {}).some( 
        ([id]) => depositos.includes(id)
    ));
  }

   // Solo aplicar agrupación si está en modo "Artículos"
   if (checkboxSeleccionados?.grupo1 === "Articulos") {
    return agruparPorArticulo(resultado);
  }
  return resultado
};


const agruparPorArticulo = (datos: ProductoAgrupado[]): ProductoAgrupado[] => {
  const agrupados: Record<string, ProductoAgrupado> = {};

  datos.forEach(item => {
    const clave = `${item.codigo}-${item.nmarca}-${item.descripcion}`;
    
    if (!agrupados[clave]) {
      agrupados[clave] = {
        ...item,
        talle: '', // o '' si prefieres vacío
        stockPorDeposito: {...item.stockPorDeposito} // Clonamos el stock por depósito
      };
    } else {
      // Sumar el stock total
      const totalActual = parseFloat(agrupados[clave].total) || 0;
      const totalNuevo = parseFloat(item.total) || 0;
      agrupados[clave].total = (totalActual + totalNuevo).toString();
      
      // Sumar stocks por depósito (como números)
      Object.entries(item.stockPorDeposito || {}).forEach(([deposito, cantidadStr]) => {
        const cantidad = parseFloat(cantidadStr) || 0;
        const stockActual = parseFloat(agrupados[clave].stockPorDeposito[deposito]?.toString() || '0') || 0;
        agrupados[clave].stockPorDeposito[deposito] = (stockActual + cantidad).toString();
      });
    }
  });

  return Object.values(agrupados);
};


const aplicarOrdenamiento = (datos: ProductoAgrupado[]) => {
  if (!Array.isArray(datos)) return [];

  const orden = checkboxSeleccionados?.grupo4;

  if (!orden) return [...datos];

  return [...datos].sort((a, b) => {
    switch (orden) {
      case 'Codigo': {
        // Conversión robusta para manejar ceros a la izquierda
        const numA = Number(a.codigo) || 0;
        const numB = Number(b.codigo) || 0;
        return numA - numB;
      }

      case 'Marca':
        return (a.nmarca || "").localeCompare(b.nmarca || "", 'es', { sensitivity: 'base' });

      case 'Descripcion':
        return (a.descripcion || "").localeCompare(b.descripcion || "", 'es', { sensitivity: 'base' });

      default:
        return 0;
    }
  });
};
  return { aplicarFiltros,agruparPorArticulo,aplicarOrdenamiento };
};
