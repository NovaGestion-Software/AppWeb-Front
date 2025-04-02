import { useEffect } from "react";
import { useStockPorSeccion } from "@/views/app/stockSeccion/store/useStockPorSeccion";
import {
  MarcaModal,
  ProductoAgrupado,
  TablaStocks,
  TableColumn,
} from "@/types";
import TablaInforme from "../../informes/_components/TablaInforme";
import { FooterRow } from "@table-library/react-table-library/table/Footer";
// import { useFiltros } from '../hooks/useFiltros';

// interface TableProps<T extends TableNode> {
//   datosParaTabla?: T[];
//   idsCoincidentes?: (string | number)[]; // Prop opcional
//   indiceSeleccionado?: number; // Prop opcional
// }
//{ datosParaTabla }: TableProps<TableNode>

export default function TablaStock() {
  const {
    footer,
    tablaStock,
    status,
    productos,
    setStockRenderizado,
    indiceSeleccionado,
    idsCoincidentes,
    depositosDisponibles,
    depositosSeleccionados,
    marcasSeleccionadas,
    setMarcasDisponibles,
    setMarcasSeleccionadas,
    setDepositosSeleccionados,
    setDepositosDisponibles,
  } = useStockPorSeccion();

  const COLUMNS: TableColumn<TablaStocks>[] = [
    {
      label: "Código",
      renderCell: (item: TablaStocks) => item.codigo, // Renderiza los rubros como una lista de elementos JSX
    },
    {
      label: "Talle",
      renderCell: (item: TablaStocks) => item.talle,
    },
    {
      label: "Descripción",
      renderCell: (item: TablaStocks) => item.descripcion,
    },
    {
      label: "Marca",
      renderCell: (item: TablaStocks) => item.nmarca,
    },
    {
      label: "Precio",
      renderCell: (item: TablaStocks) => item.precio,
    },
    // Insertar columnas de depósitos dinámicamente según los seleccionados
    ...Array.from(obtenerDepositos(tablaStock)) // Siempre usa tablaStock para obtener los depósitos
      .map((deposito) => ({
        label: `${deposito.deposito}`,
        renderCell: (item: TablaStocks) => {
          const stockPorDeposito = item.stockPorDeposito;

          if (
            depositosSeleccionados.some((d) => d.deposito === deposito.deposito)
          ) {
            return stockPorDeposito[deposito.deposito] || "";
          } else {
            return "";
          }
        },
      })),

    {
      label: "Total",
      renderCell: (item: TablaStocks) => item.total,
    },
  ];

  const customTheme = {
    Table: `
    grid-template-columns: 
        minmax(80px, 100px)
        minmax(50px, 70px)
        minmax(200px, 300px)
        minmax(100px, 150px)
        minmax(90px, 150px)
        ${"minmax(70px, 90px)".repeat(depositosDisponibles.length || 0)}
        minmax(80px, 100px);
    max-width: 70rem;
    overflow-y: auto;
    scrollbar-width: thin;
    font-variant-numeric: tabular-nums;
    font-size: 14px;
border-radius: 10px 36px 36px 12px;
        grid-template-rows: 30px auto ;

    /* Asegura que la tabla use grid layout */
    display: grid;
    grid-auto-rows: auto; /* Para filas dinámicas adicionales */

    /* Solución clave: */
    height: auto;
    min-height: 200px;
    max-height: 600px;
    

     .tr {
      min-height: 10px;
    }
    
    @media (min-width: 1280px) and (max-width: 1380px) {
      width: 55rem;
      max-height: 420px;
      font-size: 12px;
    }

    @media (min-width: 1500px) {
      width: 55rem;
      max-height: 500;
      font-size: 12px;
    }
      
    `,

    /* Mantenemos exactamente los mismos estilos para HeaderCell, Row, Cell y FooterCell */
    HeaderCell: `
      background: #2973B2;
      color: white;
      height: 30px;
      font-size: 14px;
      padding: 8px;
      border-top: 1px solid black;
      border-bottom: 1px solid black;
      &:first-child {
        border-left: 1px solid black;
      }
  
      &:last-child {
        border-right: 1px solid black;
        border-radius: 0px 12px 0px 0px;
        }
  
      &:nth-of-type(n+3) {
        text-align: center;
      }
  
      @media (min-width: 1280px) and (max-width: 1380px) {
        font-size: 12px;
        padding: 8px;
      }
    `,

    Row: `
     height: auto !important;
       min-height: 35px; /* Altura mínima para contenido */
      font-size: 14px;
      border: 1px solid #ccc;
      border-left: 1px solid black;
      border-right: 1px solid black;
  
      &:nth-of-type(odd) { background-color: #fff; }
      &:nth-of-type(even) { background-color: #eaf5fd; }
      
      &.row-select-single-selected { background-color: #CAE0BC !important; }
      border-bottom: 1px solid #ccc;
  
      @media (min-width: 1280px) and (max-width: 1380px) {
        font-size: 12px;
      }
    `,

    Cell: `
      padding: 6px;
      border-right: 1px solid #ccc;
      font-size: 14px;
      
  
      &:first-child {
        border-left: 1px solid black;
      }
  
      &:last-child {
        border-right: 1px solid black;
      }
  
      &:nth-of-type(n+3) {
        text-align: right;
      }
  
      @media (min-width: 1280px) and (max-width: 1380px) {
        padding: 2px;
        font-size: 12px;

      }
    `,
    FooterRow: `
    border-radius: 12px 24px 32px 12px;
    background-color: white;
    border-top: 1px solid black;
`,
Body: `
max-height: 500px;
overflow-y: hidden;
`,

    FooterCell: `
      position: sticky;
      bottom: 0;
      height: 30px;
      padding: 8px;
      border-top: 1px solid black;
      background-color: #fff;
      text-align: right;
      font-size: 14px;
      color: red;
      z-index: 1;
  
      &:last-child {
      border-bottom-right-radius: 22px;
        border: 1px solid black;

      }
  
      &:nth-of-type(1) {
        border: 1px solid black;
        background-color: #A5C9FF;
      border-bottom-left-radius: 14px;
        font-weight: bold;
      }
  
      &:nth-of-type(6) {
        background-color: #A5C9FF; 
        border-left: 1px solid black; 
      }
  
      &:nth-of-type(n+6) {
        background-color: #A5C9FF; 
        border-bottom: 1px solid black; 
        border-right: 1px solid black; 

      }
  
      @media (min-width: 1280px) and (max-width: 1380px) {
        padding: 4px;
        font-size: 12px;
        bottom: 0px;
      }
    `,
  };

  let idCounter = 0;

  // setea productos en la store con stock renderizado que sigue el mismo esquema que tablastock
  // Este use Effect funciona cuando los datos de tablaStock cambian
  // Lo toma y crea datosAgrupados con lo que setea el StockRenderizado
  useEffect(() => {
    // Agrupar los productos solo cuando stockRenderizado cambie
    const datosAgrupados = agruparPorProducto(tablaStock);
    setStockRenderizado(datosAgrupados);
  }, [tablaStock]);

  //depositos utiliza stock renderizado
  const depositos = obtenerDepositos(tablaStock);
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
    if (!marcasSeleccionadas.some((marca) => marca.nmarca === producto.nmarca))
      return;

    depositosSeleccionados.forEach((depositoSeleccionado) => {
      const depositoId = depositoSeleccionado.deposito;

      if (producto.stockPorDeposito?.hasOwnProperty(depositoId)) {
        const stock = parseFloat(producto.stockPorDeposito[depositoId]) || 0;

        // Acumular en el total por depósito
        totalesPorDeposito[depositoId] =
          (totalesPorDeposito[depositoId] || 0) + stock;

        // Sumar al total general solo si el depósito está seleccionado
        totalGeneral += stock;
      }
    });
  });

  // Llenamos las primeras 5 columnas fijas con valores vacíos
  for (let i = 1; i <= 5; i++) {
    datosFooter[`columna${i}`] = "";
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
        : ""
      : "";

    columnaIndex++;
  });

  // Insertamos el total general en la última columna
  datosFooter[`columna${columnaIndex}`] = totalGeneral.toString();

  //obtener depositos utiliza tablla stock que tiene una estructura vieja.
  useEffect(() => {
    if (tablaStock.length < 0) {
      const depositosUnicos = obtenerDepositos(tablaStock);
      const marcasTotal = obtenerMarcas(tablaStock);
      console.log("depositosUnicos", depositosUnicos);
      setMarcasDisponibles(marcasTotal);
      setDepositosDisponibles(depositosUnicos);
    }
  }, [tablaStock]);

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

                    const depositoId = deposito.deposito || "default";
                    const stock = parseFloat(talle.stock || "0.0000");

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

  function obtenerDepositos(
    data: any
  ): { deposito: string; ndeposito: string }[] {
    const depositos = new Map<
      string,
      { deposito: string; ndeposito: string }
    >();

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

  //console.log('prductos',productos);
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
