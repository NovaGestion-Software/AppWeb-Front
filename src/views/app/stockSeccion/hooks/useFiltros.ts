import { ProductoAgrupado } from "@/types";
import { useStockPorSeccion } from "@/views/app/stockSeccion/store/useStockPorSeccion";

export const useFiltros = () => {
  const {
    checkboxSeleccionados,
    marcasSeleccionadas,
    depositosSeleccionados,
    stockRenderizado,
  } = useStockPorSeccion();

  // aplicar filtros puede devolver dos resultados?
  // ResultadoFiltro devuelve el resultado de los filtros por stock y por tipo que interactuan con la original.
  // ResultadoOrdenamiento devuelve el resultado en base a lo renderizado en la
  //  tabla, productos.
  // Filtrar por marca y filtrar por deposito van sobre el stock original.
  const esTalleNumerico = (talle: string | undefined): boolean => {
    if (!talle?.trim()) return false;
    // Verifica si el string contiene SOLO números (enteros o decimales)
    return /^\d*\.?\d+$/.test(talle.trim());
  };
  
 const esTalleAlfabetico = (talle: string | undefined): boolean => {
  if (!talle?.trim()) return false;
  const talleNormalizado = talle.trim().toUpperCase();
  // Lista de talles alfabéticos permitidos
  const tallesValidos = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  return tallesValidos.includes(talleNormalizado);
};
  
const aplicarFiltros = () => {
  if(!Array.isArray(stockRenderizado)) return [];

  let resultado = [...stockRenderizado].filter(p => {
    const total = parseFloat(p.total);
    
    if (checkboxSeleccionados?.grupo2 === "Con Stock" && total <= 0) return false;
    if (checkboxSeleccionados?.grupo2 === "Negativos" && total >= 0) return false;
     // Filtro mejorado por tipo de talle
     if (checkboxSeleccionados?.grupo1 === "Todos") {
      return p.total; // Solo talles alfabéticos
    }
     if (checkboxSeleccionados?.grupo1 === "Talles") {
      return esTalleNumerico(p.talle); // Solo talles numéricos
    }
    
    if (checkboxSeleccionados?.grupo1 === "Articulos") {
      return esTalleAlfabetico(p.talle); // Solo talles alfabéticos
    }
   
    
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
  return resultado
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
  return { aplicarFiltros, aplicarOrdenamiento };
};
