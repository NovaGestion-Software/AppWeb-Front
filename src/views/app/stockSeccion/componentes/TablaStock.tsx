import { TablaStocks, TableColumn } from '@/types';
import TablaInforme from '../../informes/_components/TablaInforme';
import { useStockPorSeccion } from '@/store/useStockPorSeccion';
import { useEffect } from 'react';
import { TableNode } from '@table-library/react-table-library/types/table';

interface ProductoAgrupado {
  id: string;
  codigo: string;
  talle: string;
  descripcion: string;
  marca: string;
  precio: string;
  stockPorDeposito: { [depositoId: string]: string };
  total: string;
}

interface TableProps<T extends TableNode> {
  datosParaTabla?: T[];
  idsCoincidentes?: (string | number)[]; // Prop opcional
  indiceSeleccionado?: number; // Prop opcional
}

export default function TablaStock({ datosParaTabla }: TableProps<TableNode>) {
  const {
    indiceSeleccionado,
    idsCoincidentes,
    stockRenderizado,
    setTablaStock,
    setStockRenderizado,
  } = useStockPorSeccion();

  // console.log(stockRenderizado);

  let idCounter = 0;
  const depositos = obtenerDepositos(stockRenderizado);

  // console.log(depositos);

  // const columnasFijas = 6;
  // const columnasDinamicas = depositos.size;
  // const columnasTotales = columnasFijas + columnasDinamicas;
  const datosAgrupados = agruparPorProducto(stockRenderizado);
  let cantidadItems = datosAgrupados.length;
  let totalGeneral = 0;
  const totalesPorDeposito: { [deposito: string]: number } = {};

  datosAgrupados.forEach((producto) => {
    // Sumar cada depósito dentro del producto
    for (const deposito in producto.stockPorDeposito) {
      if (producto.stockPorDeposito.hasOwnProperty(deposito)) {
        const stock = parseFloat(producto.stockPorDeposito[deposito]) || 0;

        // Acumular en el total por depósito
        totalesPorDeposito[deposito] = (totalesPorDeposito[deposito] || 0) + stock;

        // Sumar al total general
        totalGeneral += stock;
      }
    }
  });

  let setData = true;
  useEffect(() => {
    if (setData) {
      setTablaStock(datosAgrupados);
      setStockRenderizado(datosAgrupados);
    }
  }, [setData]);

  // console.log('renderizado', stockRenderizado);

  const COLUMNS: TableColumn<TablaStocks>[] = [
    {
      label: 'Codigo',
      renderCell: (item: TablaStocks) => item.codigo, // Renderiza los rubros como una lista de elementos JSX
    },
    {
      label: 'Talle',
      renderCell: (item: TablaStocks) => item.talle,
    },
    {
      label: 'Descripcion',
      renderCell: (item: TablaStocks) => item.descripcion,
    },
    {
      label: 'Marca',
      renderCell: (item: TablaStocks) => item.marca,
    },
    {
      label: 'Precio',
      renderCell: (item: TablaStocks) => item.precio,
    },
    // Insertar columnas de depósitos dinamicamente
    ...Array.from(obtenerDepositos(stockRenderizado)).map((depositoId) => ({
      label: `${depositoId}`,
      renderCell: (item: TablaStocks) => {
        // Buscar el stock correspondiente a este depósito
        const stockPorDeposito = item.stockPorDeposito;
        return stockPorDeposito[depositoId] || '0'; // Si no hay stock para el depósito, mostramos 0
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
          ${'minmax(70px, 90px)'.repeat(depositos.size || 0)} /* DEPOSITOS */
          minmax(80px, 100px);      /* TOTAL */
      width: 70rem;
      height: 650px; /* Altura máxima reducida */
      overflow-y: auto; /* Habilitar scroll vertical */
      scrollbar-width: thin;
      font-variant-numeric: tabular-nums;
      font-size: 14px; /* Tamaño de fuente por defecto */
    
      @media (min-width: 1280px) and (max-width: 1380px) {
        width: 55rem; /* Ancho reducido */
        height: 400px; /* Altura máxima reducida */
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
        padding: 4px; /* Padding reducido */
        font-size: 12px;
        height: 30px;
        bottom: 0px; /* Ajuste fino para alinear el footer */
      }
    `,
  };

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
                      marca: producto.nmarca,
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

    return productosAgrupados;
  }

  function obtenerDepositos(data: any): Set<string> {
    const depositos = new Set<string>();

    if (!data) return depositos;

    // Iteramos directamente sobre el array de rubros
    data.forEach((rubro: any) => {
      if (rubro.productos) {
        rubro.productos.forEach((producto: any) => {
          if (producto.depositos) {
            producto.depositos.forEach((deposito: any) => {
              if (deposito.deposito) {
                depositos.add(deposito.deposito); // Usamos .add para asegurar que el valor sea único
              }
            });
          }
        });
      }
    });

    return depositos; // Retornamos el Set con los depósitos únicos
  }

  // console.log(datosAgrupados);
  // funcion por si el codigo viene con letras
  // const dataSinLetras = data.map((item) => ({
  //   ...item,
  //   codigo: item.codigo.replace(/\D/g, ""), // Elimina todas las letras del código
  // }));

  const datosFooter: { [key: string]: string } = {
    id: cantidadItems.toString(),
  };
  // Llenamos las primeras 5 columnas fijas con valores vacíos
  for (let i = 1; i <= 5; i++) {
    datosFooter[`columna${i}`] = '';
  }

  // Insertamos los totales de los depósitos a partir de la columna 6
  let columnaIndex = 5;
  Object.keys(totalesPorDeposito).forEach((deposito) => {
    datosFooter[`columna${columnaIndex}`] = totalesPorDeposito[deposito].toString();
    columnaIndex++;
  });

  // Insertamos el total general en la última columna
  datosFooter[`columna${columnaIndex}`] = totalGeneral.toString();

  // console.log(stockRenderizado);
  return (
    <>
      <TablaInforme
        columnas={COLUMNS}
        datosParaTabla={datosAgrupados}
        procesado={false}
        estilos={customTheme}
        footer={true}
        datosFooter={datosFooter}
        idsCoincidentes={idsCoincidentes}
        indiceSeleccionado={indiceSeleccionado}
      />
    </>
  );
}
