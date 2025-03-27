import { useEffect } from 'react';
import { useStockPorSeccion } from '@/views/app/stockSeccion/store/useStockPorSeccion';
import { TableNode } from '@table-library/react-table-library/types/table';
import { MarcaModal, ProductoAgrupado, TablaStocks, TableColumn } from '@/types';
import TablaInforme from '../../informes/_components/TablaInforme';
// import { useFiltros } from '../hooks/useFiltros';

interface TableProps<T extends TableNode> {
  datosParaTabla?: T[];
  idsCoincidentes?: (string | number)[]; // Prop opcional
  indiceSeleccionado?: number; // Prop opcional
}

export default function TablaStock({ datosParaTabla }: TableProps<TableNode>) {
  const {
    footer,
    tablaStock,
    status,
    productos,
    setProductos,
    indiceSeleccionado,
    idsCoincidentes,
    stockRenderizado,
    depositosDisponibles,
    depositosSeleccionados,
    marcasSeleccionadas,
    setMarcasDisponibles,
    setMarcasSeleccionadas,
    setDepositosSeleccionados,
    setTablaStock,
    setStockRenderizado,
    setDepositosDisponibles,
  } = useStockPorSeccion();

  const COLUMNS: TableColumn<TablaStocks>[] = [
    {
      label: 'Código',
      renderCell: (item: TablaStocks) => item.codigo, // Renderiza los rubros como una lista de elementos JSX
    },
    {
      label: 'Talle',
      renderCell: (item: TablaStocks) => item.talle,
    },
    {
      label: 'Descripción',
      renderCell: (item: TablaStocks) => item.descripcion,
    },
    {
      label: 'Marca',
      renderCell: (item: TablaStocks) => item.nmarca,
    },
    {
      label: 'Precio',
      renderCell: (item: TablaStocks) => item.precio,
    },
    // Insertar columnas de depósitos dinámicamente según los seleccionados
    ...Array.from(obtenerDepositos(tablaStock)) // Obtiene todos los depósitos
      .map((deposito) => ({
        label: `${deposito.deposito}`, // Muestra el número del depósito en la columna
        renderCell: (item: TablaStocks) => {
          const stockPorDeposito = item.stockPorDeposito;

          // Verificamos si el depósito está en los seleccionados
          if (depositosSeleccionados.some((d) => d.deposito === deposito.deposito)) {
            // Si el depósito está seleccionado, mostramos el valor correspondiente
            return stockPorDeposito[deposito.deposito] || ''; // Si no hay stock, mostramos ''
          } else {
            // Si el depósito no está seleccionado, mostramos un valor vacío en la celda
            return '';
          }
        },
      })),

    {
      label: 'Total',
      renderCell: (item: TablaStocks) => item.total,
    },
  ];

  const customTheme = {
    Table: `
      grid-template-columns: 
          minmax(80px, 100px)       /* CODIGO */
          minmax(50px, 70px)       /* TALLE */
          minmax(200px, 300px)     /* DESCRIPCION */
          minmax(100px, 150px)     /* MARCA */
          minmax(90px, 150px)      /* PRECIO */
          ${'minmax(70px, 90px)'.repeat(depositosDisponibles.length || 0)} /* DEPOSITOS */
          minmax(80px, 100px);      /* TOTAL */
      max-width: 70rem;
      overflow-y: auto; /* Habilitar scroll vertical */
      scrollbar-width: thin;
      font-variant-numeric: tabular-nums;
      font-size: 14px; /* Tamaño de fuente por defecto */
    
      @media (min-width: 1280px) and (max-width: 1380px) {
        width: 55rem; /* Ancho reducido */
        height: 420px; /* Altura máxima reducida */
        font-size: 12px; /* Tamaño de fuente más pequeño */
      }

      @media (min-width: 1500px) {
        width: 55rem; /* Ancho reducido */
        height: 700px; /* Altura máxima reducida */
        font-size: 12px; /* Tamaño de fuente más pequeño */
      }
    `,

    HeaderCell: `
      background: #2973B2;
      color: white;
      height: 30px; /* Altura por defecto */
      font-size: 14px; /* Tamaño de fuente por defecto */
      padding: 14px; /* Padding por defecto */
      border-top: 1px solid black; /* Borde superior */
      border-bottom: 1px solid black; /* Borde superior */
      
      &:first-child {
        /* border-top-left-radius: 12px; Solo el borde superior izquierdo tendrá el radio */
        border-left: 1px solid black; /* Borde izquierdo */
      }

      &:last-child {
        /*border-top-right-radius: 12px;  Solo el borde superior izquierdo tendrá el radio */
        border-right: 1px solid black; /* Borde derecho */
      }

      &:nth-of-type(n+3) {
        text-align: center;
      }

      @media (min-width: 1280px) and (max-width: 1380px) {
        height: 20px; /* Altura reducida */
        font-size: 12px; /* Tamaño de fuente más pequeño */
        padding: 8px; /* Padding reducido */
      }
    `,

    Row: `
      height: 10px; /* Altura de fila por defecto */
      font-size: 14px; /* Tamaño de fuente por defecto */
      border: 1px solid #ccc; /* Borde superior para cada fila */ 
      border-left: 1px solid black; /* Borde izquierdo */
      border-right: 1px solid black; /* Borde derecho */  

      &:nth-of-type(odd) { background-color: #fff; }
      &:nth-of-type(even) { background-color: #eaf5fd; }
      
      &.row-select-single-selected { background-color: #CAE0BC !important; }
      border-bottom: 1px solid #ccc;

      @media (min-width: 1280px) and (max-width: 1380px) {
        height: 8px; /* Altura de fila reducida */
        font-size: 12px; /* Tamaño de fuente más pequeño */
      }
    `,

    Cell: `
      padding: 6px; /* Padding por defecto */
      border-right: 1px solid #ccc; /* Borde derecho */
      
      font-size: 14px; /* Tamaño de fuente por defecto */

      &:first-child {
        border-left: 1px solid black; /* Borde izquierdo negro */
        /* border-top-left-radius: 12px; */
      }

      &:last-child {
        border-right: 1px solid black; /* Borde derecho */
        /*border-top-right-radius: 12px; */
      }


      &:nth-of-type(n+3) {
        text-align: right;
      }

      @media (min-width: 1280px) and (max-width: 1380px) {
        padding: 2px; /* Padding reducido */
        font-size: 12px; /* Tamaño de fuente más pequeño */
      }
    `,

    FooterCell: `
      position: sticky;
      bottom: 0;
      height: 30px;
      padding: 8px;
      border-top: 1px solid black;
      background-color: #fff; /* Fondo sólido para ocultar el contenido de la tabla */
      text-align: right;
      font-size: 14px;
      color: red;
      z-index: 1; /* Asegurar que el footer esté por encima del contenido */

      &:last-child {
        border-left: 1px solid black;
        /*border-bottom-right-radius: 12px;*/
        
      }

      &:nth-of-type(1) {
        border: 1px solid black;
        background-color: #A5C9FF;
        font-weight: bold;
        /*border-bottom-left-radius: 8px;  Redondeo en la esquina inferior izquierda */
      }

      
      &:nth-of-type(6) {
        background-color: #A5C9FF; 
        border-left: 1px solid black; 
      }

      /* Aplica color desde la columna 6 en adelante */
      &:nth-of-type(n+6) {
        background-color: #A5C9FF; 
        border-bottom: 1px solid black; 
        border-right: 1px solid black; 
      }

      @media (min-width: 1280px) and (max-width: 1380px) {
        padding: 4px;
        font-size: 12px;
        bottom: 0px; /* Ajuste fino para alinear el footer */
      }
    `,
  };

  let idCounter = 0;

  useEffect(() => {
    // Agrupar los productos solo cuando stockRenderizado cambie
    const datosAgrupados = agruparPorProducto(stockRenderizado);
    setProductos(datosAgrupados);
  }, [stockRenderizado, setProductos]);

  const depositos = obtenerDepositos(stockRenderizado);
  let cantidadItems = productos.length;
  let totalGeneral = 0;
  let columnaIndex = 5;
  const totalesPorDeposito: { [deposito: string]: number } = {};
  const datosFooter: { [key: string]: string } = {
    id: cantidadItems.toString(),
  };

  // Filtramos los totales solo para depósitos y marcas seleccionadas
  productos.forEach((producto) => {
    // Verificamos si la marca del producto está en la lista de marcas seleccionadas
    if (!marcasSeleccionadas.some((marca) => marca.nmarca === producto.nmarca)) return;

    depositosSeleccionados.forEach((depositoSeleccionado) => {
      const depositoId = depositoSeleccionado.deposito;

      if (producto.stockPorDeposito?.hasOwnProperty(depositoId)) {
        const stock = parseFloat(producto.stockPorDeposito[depositoId]) || 0;

        // Acumular en el total por depósito
        totalesPorDeposito[depositoId] = (totalesPorDeposito[depositoId] || 0) + stock;

        // Sumar al total general solo si el depósito está seleccionado
        totalGeneral += stock;
      }
    });
  });

  // Llenamos las primeras 5 columnas fijas con valores vacíos
  for (let i = 1; i <= 5; i++) {
    datosFooter[`columna${i}`] = '';
  }

  depositos.forEach((deposito) => {
    const depositoId = deposito.deposito;
    const total = totalesPorDeposito[depositoId];

    // Solo mostramos el total si el depósito está seleccionado
    datosFooter[`columna${columnaIndex}`] = depositosSeleccionados.some(
      (d) => d.deposito === depositoId
    )
      ? total !== undefined
        ? total.toString()
        : ''
      : '';

    columnaIndex++;
  });

  // Insertamos el total general en la última columna
  datosFooter[`columna${columnaIndex}`] = totalGeneral.toString();

  useEffect(() => {}, [datosParaTabla]);

  // console.log(datosAgrupados);
  useEffect(() => {
    if (tablaStock.length < 0) {
      const depositosUnicos = obtenerDepositos(tablaStock);
      const marcasTotal = obtenerMarcas(tablaStock);

      setTablaStock(productos);
      setStockRenderizado(productos);

      setMarcasDisponibles(marcasTotal);
      setDepositosDisponibles(depositosUnicos);
    }
  }, [tablaStock]);

  useEffect(() => {
    if (stockRenderizado) {
      if (marcasSeleccionadas.length === 0) {
        const marcasDisponibles = obtenerMarcas(stockRenderizado);
        setMarcasDisponibles(marcasDisponibles);
        setMarcasSeleccionadas(marcasDisponibles);
      }

      if (depositosSeleccionados.length === 0) {
        const depositosUnicos = obtenerDepositos(stockRenderizado);
        setDepositosDisponibles(depositosUnicos);
        setDepositosSeleccionados(depositosUnicos);
      }
      // // Aplicar filtros cada vez que cambien marcasSeleccionadas
      // const stockFiltrado = aplicarFiltros();
      // setStockRenderizado(stockFiltrado);
    }
  }, [stockRenderizado]);

  function agruparPorProducto(data: any): ProductoAgrupado[] {
    const productosAgrupados: ProductoAgrupado[] = [];

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
                      precio: producto.prec1,
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
    // setProductos(productosAgrupados);
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
    const depositosUnicos = Array.from(depositos.values()).sort((a, b) =>
      a.deposito.localeCompare(b.deposito)
    );

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

  // console.log(productos);
  return (
    <>
      <TablaInforme
        columnas={COLUMNS}
        datosParaTabla={productos}
        procesado={false}
        estilos={customTheme}
        footer={footer}
        datosFooter={datosFooter}
        status={status}
        idsCoincidentes={idsCoincidentes}
        indiceSeleccionado={indiceSeleccionado}
      />
    </>
  );
}
