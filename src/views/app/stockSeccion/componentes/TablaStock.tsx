import { TablaStocks, TableColumn } from '@/types';
import TablaInforme from '../../informes/_components/TablaInforme';
// import TablaInforme1 from '../../informes/_components/TablaInforme1';
// import { useEffect } from 'react';
import { TableNode } from '@table-library/react-table-library/types/table';
// import { useStockPorSeccion } from '@/store/useStockPorSeccion';

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
  dataParaTabla: T[];
  idsCoincidentes?: (string | number)[]; // Prop opcional
  indiceSeleccionado?: number; // Prop opcional
}

export default function TablaStock({ dataParaTabla }: TableProps<TableNode>) {
  let idCounter = 0;
  const depositos = obtenerDepositos(dataParaTabla);
  // const columnasFijas = 6;
  // const columnasDinamicas = depositos.size;
  // const columnasTotales = columnasFijas + columnasDinamicas;
  const datosAgrupados = agruparPorProducto(dataParaTabla);
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

  // console.log('Total por depósito:', totalesPorDeposito);
  // console.log('Total general:', totalGeneral);

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
    ...Array.from(obtenerDepositos(dataParaTabla)).map((depositoId) => ({
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
        ${'minmax(70px, 90px)'.repeat(depositos.size)} /* DEPOSITOS */
        minmax(80px, 100px);      /* TOTAL */
    border-radius: 12px;
    width: 70rem;
    max-height: 550px; /* Reducir la altura máxima para dejar espacio al footer */
    overflow-y: auto; /* Habilitar scroll vertical */
    scrollbar-width: thin;
    border: 1px solid black;
    font-variant-numeric: tabular-nums;
    font-size: 14px; /* Tamaño de fuente por defecto */
    margin-bottom: 40px; /* Espacio para el footer */
    z-index: 0; /* Asegurarse de que la tabla está debajo del footer */
  
    @media (min-width: 1280px) and (max-width: 1380px) {
      width: 55rem; /* Ancho reducido */
      max-height: 350px; /* Altura máxima reducida */
      font-size: 12px; /* Tamaño de fuente más pequeño */
      height: 360px; /* Altura reducida para pantallas medianas */
      margin-bottom: 10px; /* Espacio reducido para el footer */
    }
  `,

    Row: `
    height: 10px; /* Altura de fila por defecto */
    font-size: 14px; /* Tamaño de fuente por defecto */
    &:nth-of-type(odd) { background-color: #fff; }
    &:nth-of-type(even) { background-color: #eaf5fd; }
    
    &.row-select-single-selected { background-color: #CAE0BC !important; }
    border-bottom: 1px solid #ccc;

    @media (min-width: 1280px) and (max-width: 1380px) {
      height: 8px; /* Altura de fila reducida */
      font-size: 12px; /* Tamaño de fuente más pequeño */
    }
  `,

    HeaderCell: `
    background: #2973B2;
    color: white;
    height: 30px; /* Altura por defecto */
    font-size: 14px; /* Tamaño de fuente por defecto */
    padding: 14px; /* Padding por defecto */
    &:nth-of-type(n+3) {
      text-align: center;
    }

    @media (min-width: 1280px) and (max-width: 1380px) {
      height: 20px; /* Altura reducida */
      font-size: 12px; /* Tamaño de fuente más pequeño */
      padding: 8px; /* Padding reducido */
    }
  `,

    Cell: `
    padding: 6px; /* Padding por defecto */
    border-right: 1px solid #ccc;
    font-size: 14px; /* Tamaño de fuente por defecto */

    &:last-child {
      border-right: none;
    }

    &:nth-of-type(n+3) {
      text-align: right;
    }

    @media (min-width: 1280px) and (max-width: 1380px) {
      padding: 4px; /* Padding reducido */
      font-size: 12px; /* Tamaño de fuente más pequeño */
    }
  `,

    FooterCell: `
    position: sticky;
    bottom: 0;
    padding: 8px;
    border-top: 1px solid #ccc;
    
    background-color: #fff; /* Fondo sólido para ocultar el contenido de la tabla */
    text-align: right;
    font-size: 14px;
    z-index: 1; /* Asegurar que el footer esté por encima del contenido */

    &:last-child {
      border-right: none;
      color: red;
    }

    &:nth-of-type(1) {
      border: 1px solid black;
      background-color: #A5C9FF;
      font-weight: bold;
      border-bottom-left-radius: 8px; /* Redondeo en la esquina inferior izquierda */
    }

     /* Aplica color desde la columna 6 en adelante */
    &:nth-of-type(n+6) {
      background-color: #A5C9FF; 
      border: 1px solid black; 
      border-bottom: none;
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

    for (const rubroKey in data) {
      if (data.hasOwnProperty(rubroKey)) {
        const rubro = data[rubroKey];

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
      }
    }

    return depositos; // Retornamos el Set con los depósitos únicos
  }

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

  // console.log(datosFooter);
  return (
    <div className="flex justify-center w-full h-fit my-20">
      <TablaInforme<TablaStocks>
        columnas={COLUMNS}
        dataParaTabla={datosAgrupados}
        procesado={false}
        estilos={customTheme}
        footer={true}
        datosFooter={datosFooter}
      />
    </div>
  );
}
