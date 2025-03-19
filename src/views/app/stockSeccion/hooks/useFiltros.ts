import { useStockPorSeccion } from '@/views/app/stockSeccion/store/useStockPorSeccion';

export const useFiltros = () => {
  const { checkboxSeleccionados, tablaStock } = useStockPorSeccion();

  const aplicarFiltros = () => {
    if (!tablaStock || tablaStock.length === 0) return []; // Asegura que tablaStock tenga datos

    // console.log(tablaStock);
    let data = [...tablaStock]; // Siempre parte de los datos originales

    // Filtro por stock
    if (checkboxSeleccionados.grupo2 === 'Con Stock') {
      data = data
        .map((rubro) => ({
          ...rubro,
          productos: rubro.productos
            .map((producto: any) => ({
              ...producto,
              depositos: producto.depositos
                .map((deposito: any) => ({
                  ...deposito,
                  talles: deposito.talles.filter((talle: any) => parseFloat(talle.stock) > 0), // Filtramos talles con stock > 0
                }))
                .filter((deposito: any) => deposito.talles.length > 0), // Eliminamos depósitos sin talles con stock
            }))
            .filter((producto: any) => producto.depositos.length > 0), // Eliminamos productos sin depósitos con stock
        }))
        .filter((rubro) => rubro.productos.length > 0); // Eliminamos rubros sin productos
    } else if (checkboxSeleccionados.grupo2 === 'Negativos') {
      data = data
        .map((rubro) => ({
          ...rubro,
          productos: rubro.productos
            .map((producto: any) => ({
              ...producto,
              depositos: producto.depositos
                .map((deposito: any) => ({
                  ...deposito,
                  talles: deposito.talles.filter((talle: any) => parseFloat(talle.stock) < 0), // Solo talles con stock < 0
                }))
                .filter((deposito: any) => deposito.talles.length > 0), // Eliminamos depósitos sin talles negativos
            }))
            .filter((producto: any) => producto.depositos.length > 0), // Eliminamos productos sin depósitos negativos
        }))
        .filter((rubro) => rubro.productos.length > 0); // Eliminamos rubros sin productos negativos
    }

    // Filtro por talles o artículos
    if (checkboxSeleccionados.grupo1 === 'Talles') {
      data = data
        .map((rubro) => ({
          ...rubro,
          productos: rubro.productos
            .map((producto: any) => ({
              ...producto,
              depositos: producto.depositos
                .map((deposito: any) => ({
                  ...deposito,
                  talles: deposito.talles.filter(
                    (talle: any) => talle.talle && talle.talle.trim() !== ''
                  ), // Filtra solo los que tienen un talle definido y no vacío
                }))
                .filter((deposito: any) => deposito.talles.length > 0), // Eliminamos depósitos sin talles válidos
            }))
            .filter((producto: any) => producto.depositos.length > 0), // Eliminamos productos sin depósitos con talles válidos
        }))
        .filter((rubro) => rubro.productos.length > 0); // Eliminamos rubros sin productos válidos
    } else if (checkboxSeleccionados.grupo1 === 'Articulos') {
      data = data.filter((item) => !item.talle || item.talle === '');
    }

    // Filtro por ordenación
    const criterioOrden = checkboxSeleccionados.grupo4;
    if (criterioOrden) {
      switch (criterioOrden) {
        case 'Código':
          data.forEach((rubro) => {
            rubro.productos.sort(
              (a: any, b: any) => (parseInt(a.codigo) || 0) - (parseInt(b.codigo) || 0)
            );
          });
          break;
        case 'Marca':
          data.forEach((rubro) => {
            rubro.productos.sort((a: any, b: any) =>
              (a.nmarca || '').localeCompare(b.nmarca || '', 'es', { sensitivity: 'base' })
            );
          });
          break;
        case 'Descripción':
          data.forEach((rubro) => {
            rubro.productos.sort((a: any, b: any) =>
              (a.nombre || '').localeCompare(b.nombre || '', 'es', { sensitivity: 'base' })
            );
          });
          break;
        default:
          break;
      }
    }
    return data;
  };

  return { aplicarFiltros };
};
