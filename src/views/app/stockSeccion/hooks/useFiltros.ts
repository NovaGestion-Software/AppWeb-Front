// useFiltros.ts

import { useStockPorSeccion } from '@/views/app/stockSeccion/store/useStockPorSeccion';

export const useFiltros = () => {
  const { checkboxSeleccionados, tablaStock } = useStockPorSeccion();

  const aplicarFiltros = () => {
    let data = [...tablaStock]; // Siempre parte de los datos originales

    // Filtro por stock
    if (checkboxSeleccionados.grupo2 === 'Con Stock') {
      data = data.filter((item) => Number(item.total) > 0);
    } else if (checkboxSeleccionados.grupo2 === 'Negativos') {
      data = data.filter((item) => Number(item.total) < 0);
    }

    // Filtro por talles o artículos
    if (checkboxSeleccionados.grupo1 === 'Talles') {
      data = data.filter((item) => item.talle && item.talle !== '');
    } else if (checkboxSeleccionados.grupo1 === 'Articulos') {
      data = data.filter((item) => !item.talle || item.talle === '');
    }

    // Filtro por ordenación
    const criterioOrden = checkboxSeleccionados.grupo4;
    if (criterioOrden) {
      switch (criterioOrden) {
        case 'Codigo':
          data.sort((a, b) => parseInt(a.codigo) - parseInt(b.codigo));
          break;
        case 'Marca':
          data.sort((a, b) => a.marca.localeCompare(b.marca));
          break;
        case 'Descripcion':
          data.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
          break;
        default:
          break;
      }
    }

    return data;
  };

  return { aplicarFiltros };
};
