import { useEffect, useState } from 'react';
import { useStockPorSeccion } from '@/views/app/stockSeccion/store/useStockPorSeccion';
import { MarcaModal, ProductoAgrupado } from '@/types';
import TablaDefault from '@/frontend-resourses/components/Tables/TablaDefault/TablaDefault';
import { ExtendedColumn } from '@/frontend-resourses/components/Tables/types';

type ProductosCType = {
  id: number;
  codigo: string;
  talle: string;
  descripcion: string;
  marca: string;
  nmarca: string;
  precios: {
    contado: string;
    lista2: string;
    lista3: string;
  };
  precio: string;
  stockPorDeposito: { [deposito: string]: string };
  total: string;
};
type SelectData = {
  id: number;
  hora: string;
  nOperaciones: number;
  porcentajeOperaciones: string;
  importe: string;
  porcentajeImporte: string;
  pares: number;
  porcentajePares: string;
};
export default function TablaStock() {
  // store
  const {
    tablaStock,
    productos,
    setStockRenderizado,
    indiceSeleccionado,
    idsCoincidentes,
    depositosSeleccionados,
    marcasSeleccionadas,
    setMarcasDisponibles,
    setMarcasSeleccionadas,
    setDepositosSeleccionados,
    setDepositosDisponibles,
    buscado,
    modoNavegacion,
    setUltimoIndiceBusqueda,
    indiceGlobal,
  } = useStockPorSeccion();
  //depositos utiliza stock renderizado
  const widthBase =   productos.length > 0 ?'58rem' : "40rem";
  const height =  productos.length < 10 ? 'auto': '27rem';
  const heightContainerBase = "27rem";

  const width1440px =  productos.length > 0 ?'60.3rem' : "40rem";
  const height1440px =  productos.length < 10 ? 'auto': '37rem';
  const heightContainer1440 = "37rem";
  
  const width1536px = productos.length > 0 ? '71.3rem' : '54.3rem';
  const height1536px = productos.length < 10 ?  "auto":'34rem' ;
  const heightContainer1536 = "34rem";
  
  // este componente
  const heightContainerTabla = '30rem';
  const heightContainerTabla1440 = '40rem';
  const heightContainerTabla1536 = '37rem';

  const depositos = obtenerDepositos(tablaStock);
  let cantidadItems = productos.length;
  let totalGeneral = 0;
  let columnaIndex = 5;
  const totalesPorDeposito: { [deposito: string]: number } = {};
  const datosFooter: { [key: string]: string } = {
    id: cantidadItems.toString(),
  };
  const [seleccionado, setSeleccionado] = useState<SelectData | null>(null);

  const productosColumns: Array<ExtendedColumn<ProductosCType>> = [
    {
      key: 'codigo',
      label: 'Código',
      minWidth: '80',
      maxWidth: '100',
    },
    { key: 'talle', label: 'Talle', minWidth: '50', maxWidth: '70' },
    {
      key: 'descripcion',
      label: 'Descripción',
      minWidth: '200',
      maxWidth: '300',
    },
    { key: 'nmarca', label: 'Marca', minWidth: '100', maxWidth: '150' },
    { key: 'precio', label: 'Precio', minWidth: '90', maxWidth: '150' },
    ...depositos.map((deposito) => ({
      key: deposito.deposito as keyof ProductosCType,
      label: deposito.deposito,
      minWidth: '70',
      maxWidth: '90',
      resaltar: true,
      renderCell: (item: ProductosCType) => item.stockPorDeposito?.[deposito.deposito] ?? '',
    })),
    {
      key: 'total',
      label: 'Total',
      minWidth: '80',
      maxWidth: '100',
      resaltar: true,
    },
  ];

  // Este use Effect funciona cuando los datos de tablaStock cambian
  // Lo toma y crea datosAgrupados con lo que setea el StockRenderizado
  useEffect(() => {
    // Agrupar los productos solo cuando stockRenderizado cambie
    const datosAgrupados = agruparPorProducto(tablaStock);
    setStockRenderizado(datosAgrupados);
  }, [tablaStock]);

  // Filtramos los totales solo para depósitos y marcas seleccionadas
  productos.forEach((producto) => {
    // Verifica si la marca del producto está entre las seleccionadas
    if (marcasSeleccionadas.some((marcaModal) => marcaModal.marca === producto.marca)) {
      depositosSeleccionados.forEach(({ deposito }) => {
        const valor = parseFloat(producto.stockPorDeposito[deposito] ?? '0');
        const totalActual = totalesPorDeposito[deposito] ?? 0;
        totalesPorDeposito[deposito] = totalActual + valor;
        totalGeneral += valor;
      });
    }
  });

  // Agrega los totales al datosFooter
  depositosSeleccionados.forEach(({ deposito }) => {
    datosFooter[deposito] = totalesPorDeposito[deposito]?.toFixed(0) ?? '0';
  });

  datosFooter.total = totalGeneral.toFixed(0);

  // Llenamos las primeras 5 columnas fijas con valores vacíos
  for (let i = 1; i <= 5; i++) {
    datosFooter[`columna${i}`] = '';
  }

  depositos.forEach((deposito) => {
    const depositoId = deposito.deposito;
    const total = totalesPorDeposito[depositoId];

    // Solo mostramos el total si el depósito está seleccionado
    datosFooter[`columna${columnaIndex}`] = depositosSeleccionados.some((d) => d.deposito === depositoId) ? (total !== undefined ? total.toString() : '') : '';

    columnaIndex++;
  });

  // Insertamos el total general en la última columna
  datosFooter[`columna${columnaIndex}`] = totalGeneral.toString();

  // Setea los depositos y las marcas disponibles
  useEffect(() => {
    if (tablaStock) {
      const marcasDisponibles = obtenerMarcas(tablaStock);
      setMarcasDisponibles(marcasDisponibles);
      setMarcasSeleccionadas(marcasDisponibles);

      const depositosUnicos = obtenerDepositos(tablaStock);
      setDepositosDisponibles(depositosUnicos);
      setDepositosSeleccionados(depositosUnicos);
    }
  }, [tablaStock]);

  function agruparPorProducto(data: any): ProductoAgrupado[] {
    const productosAgrupados: ProductoAgrupado[] = [];
    let idCounter = 1;

    if (!data) return productosAgrupados;

    for (const rubroKey in data) {
      if (data.hasOwnProperty(rubroKey)) {
        const rubro = data[rubroKey];
        if (rubro.productos) {
          rubro.productos.forEach((producto: any) => {
            if (producto.depositos) {
              producto.depositos.forEach((deposito: any) => {
                if (deposito.talles) {
                  deposito.talles.forEach((talle: any) => {
                    let stockPorDeposito: { [deposito: string]: string } = {};
                    let totalStock = 0;

                    const depositoId = deposito.deposito || 'default';
                    const stock = parseFloat(talle.stock || '0.0000');

                    stockPorDeposito[depositoId] = stock.toString();
                    totalStock += stock;

                    productosAgrupados.push({
                      id: `${idCounter++}`,
                      codigo: producto.codigo,
                      talle: talle.talle,
                      descripcion: producto.nombre,
                      marca: producto.marca,
                      nmarca: producto.nmarca,
                      precios: {
                        // 👈 Guardamos todos los precios
                        contado: producto.prec1,
                        lista2: producto.prec2,
                        lista3: producto.prec3,
                      },
                      precio: producto.prec1, // Precio por defecto
                      stockPorDeposito,
                      total: totalStock.toString(),
                    });
                  });
                }
              });
            }
          });
        }
      }
    }
    return productosAgrupados;
  }

  function obtenerDepositos(data: any): { deposito: string; ndeposito: string }[] {
    const depositos = new Map<string, { deposito: string; ndeposito: string }>();

    if (!data) return [];

    data.forEach((rubro: any) => {
      if (rubro.productos) {
        rubro.productos.forEach((producto: any) => {
          if (producto.depositos) {
            producto.depositos.forEach((deposito: any) => {
              if (deposito.deposito && deposito.ndeposito) {
                depositos.set(deposito.deposito, {
                  deposito: deposito.deposito,
                  ndeposito: deposito.ndeposito,
                });
              }
            });
          }
        });
      }
    });

    // Convertir Map a Array y ordenar por 'deposito'
    const depositosUnicos = Array.from(depositos.values()).sort((a, b) => a.deposito.localeCompare(b.deposito));

    return depositosUnicos; // Retorna el array ordenado
  }

  function obtenerMarcas(data: any[]): MarcaModal[] {
    const marcasMap = new Map<string, string>();

    data.forEach((rubro) => {
      rubro.productos.forEach((producto: any) => {
        const nmarcaKey = producto.nmarca.trim().toLowerCase();
        if (!marcasMap.has(nmarcaKey)) {
          marcasMap.set(nmarcaKey, producto.marca);
        }
      });
    });

    return Array.from(marcasMap, ([nmarcaKey, marca]) => ({
      marca,
      nmarca: nmarcaKey.toUpperCase(),
    })).sort((a, b) => a.nmarca.localeCompare(b.nmarca));
  }

  // ver seleccion.
  useEffect(() => {
    console.log('seleccionado desde tabla stock', seleccionado);
  }, [seleccionado]);

  // props de tabla.
  const propsTablaStock = {
    datosParaTabla: productos,
    objectColumns: productosColumns,
    objectStyles: {
      width: widthBase,
      height: height,
      heightContainer: heightContainerBase,
      columnasNumber: [5, 6, 7, 8, 9],
      addCellClass: 'max-height: 30px;',
      viewport1440: {
        width1440px: width1440px,
        height1440px: height1440px,
        heightContainer1440px: heightContainer1440,
        addCellClass1440px: 'max-height: 40px;',

      },
      viewport1536: {
        width1536px: width1536px,
        height1536px: height1536px,
        heightContainer1536px: heightContainer1536,
      },
    },
    objectSelection: {
      seleccionado,
      setSeleccionado,
    },
    objectFooter: {
      footer: true,
      datosFooter: datosFooter,
      footerHeight: 'h-8',
    },
    searchFunction: {
      hayFuncionBusqueda: true,
      idsCoincidentes: idsCoincidentes,
      indiceSeleccionado: indiceSeleccionado ?? undefined,
      buscado: buscado,
      modoNavegacion: modoNavegacion,
      setUltimoIndiceBusqueda: setUltimoIndiceBusqueda,
      indiceGlobal: indiceGlobal,
    },
  };
  const styleContainer = `
  #container {
    height: ${heightContainerTabla};
  }

  @media (min-width: 1440px) {
    #container {
      height: ${heightContainerTabla1440};
    }
  }

  @media (min-width: 1536px) {
    #container {
      height: ${heightContainerTabla1536};
    }
  }
`;
  return (
    <div id="container" className="flex flex-col w-fit bg-white  border border-black overflow-hidden rounded-md shadow-md ">
      <style>{styleContainer}</style>
      <TablaDefault props={propsTablaStock} />
    </div>
  );
}
