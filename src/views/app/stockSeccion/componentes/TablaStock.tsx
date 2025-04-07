import { useEffect } from "react";
import { useStockPorSeccion } from "@/views/app/stockSeccion/store/useStockPorSeccion";
import {
  MarcaModal,
  ProductoAgrupado,
  TablaStocks,
  TableColumn,
} from "@/types";
import TablaInforme from "../../informes/_components/TablaInforme";


export default function TablaStock() {
// store
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
    buscado,
    modoNavegacion,
    setUltimoIndiceBusqueda, indiceGlobal
  } = useStockPorSeccion();
  //depositos utiliza stock renderizado
  const depositos = obtenerDepositos(tablaStock);
  let cantidadItems = productos.length;
  let totalGeneral = 0;
  let columnaIndex = 5;
  const totalesPorDeposito: { [deposito: string]: number } = {};
  const datosFooter: { [key: string]: string } = {
    id: cantidadItems.toString(),
  };
  let idCounter = 0;

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

// Un before con css en header  y footer con un color solido blanco que funcione de fondo para que las partes de la tabla que pasan por ahi no se vean.
const customTheme = {
  Table: `
  
    display: grid;
    grid-template-columns: 
      minmax(80px, 100px)
      minmax(50px, 70px)
      minmax(200px, 300px)
      minmax(100px, 150px)
      minmax(90px, 150px)
      ${"minmax(70px, 90px)".repeat(depositosDisponibles.length || 0)}
      minmax(80px, 100px);
    grid-template-rows: 30px auto;
    grid-auto-rows: auto;

    font-variant-numeric: tabular-nums;
    font-size: 14px;
    max-width: 70rem;
    min-height: 200px;
    max-height: 600px;
    overflow-y: auto;
    scrollbar-width: none;
    scrollbar-color: #2973B2 #fff;
    scroll-behavior: smooth;
    scrollbar-thumb:hover {
      background-color: #2973B2;
    }
    border-radius: 10px;
    border: 1px solid black;

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
      max-height: 500px;
      font-size: 12px;
    }
  `,

  HeaderCell: `
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: #2973B2;
    color: white;
    height: 30px;
    font-size: 14px;
    padding: 8px;
    border-bottom: 1px solid black;

    &:first-of-type {
      border-top-left-radius: 10px;
    }

    &:last-of-type {
      border-top-right-radius: 10px;
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
    min-height: 35px;
    font-size: 14px;
    border-left: 1px solid black;
    border-right: 1px solid black;
    &:nth-of-type(odd) { background-color: #fff; }
    &:nth-of-type(even) { background-color: #eaf5fd; }

    &.row-select-single-selected { background-color: #CAE0BC !important; }

    @media (min-width: 1280px) and (max-width: 1380px) {
      font-size: 12px;
    }
  `,

  Cell: `
    padding: 6px;
    border-right: 1px solid #ccc;
    font-size: 14px;

    &:first-of-type {
      border-left: 1px solid black;
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
    background-color: white;
  `,

  FooterCell: `
    position: sticky;
    bottom: 0;
    z-index: 2;
    height: auto;
    min-height: 30px;
    max-height: 60px;
    padding: 8px;
    background-color: #FFF;
    text-align: right;
    font-size: 14px;
    color: red;
    border-top: 1px solid black;

    &:first-of-type {
      background-color: #A5C9FF;
      font-weight: bold;
      border-bottom-left-radius: 10px;
    border-right: 1px solid black;
    }

    &:last-of-type {
      border-bottom-right-radius: 10px;
    border-left: 1px solid black;

    }

    &:nth-of-type(n+6) {
      background-color: #A5C9FF;
    border-right: 1px solid black;
    }
        &:nth-of-type(6), &:nth-of-type(7) {
    border-left: 1px solid black;
    }  

    @media (min-width: 1280px) and (max-width: 1380px) {
      padding: 4px;
      font-size: 12px;
    }
  `,

  Body: `
    max-height: 500px;
  `,
};


  // Este use Effect funciona cuando los datos de tablaStock cambian
  // Lo toma y crea datosAgrupados con lo que setea el StockRenderizado
  useEffect(() => {
    // Agrupar los productos solo cuando stockRenderizado cambie
    const datosAgrupados = agruparPorProducto(tablaStock);
    setStockRenderizado(datosAgrupados);
  }, [tablaStock]);


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
        indiceSeleccionado={indiceSeleccionado ?? undefined}
        buscado={buscado}
        modoNavegacion={modoNavegacion}
        setUltimoIndiceBusqueda={setUltimoIndiceBusqueda} 
        indiceGlobal={indiceGlobal}
        hayFuncionBusqueda={true}
      />
    </>
  );
}
