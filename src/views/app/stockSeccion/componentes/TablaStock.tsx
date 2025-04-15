import { useEffect } from "react";
import { useStockPorSeccion } from "@/views/app/stockSeccion/store/useStockPorSeccion";
import { MarcaModal, ProductoAgrupado, TablaStocks, TableColumn } from "@/types";
import TablaInforme from "@/frontend-resourses/components/Tables/TablaInforme";
import { TableUtils } from "@/frontend-resourses/components/Tables/TableUtils";

export default function TablaStock() {
  // store
  const {
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
    setUltimoIndiceBusqueda,
    indiceGlobal,
    tipoPrecio,
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

  type ExtendedColumn<T> = {
    key: keyof T;
    label: string;
    minWidth?: string | number;
    maxWidth?: string | number;
    renderCell?: (item: T) => React.ReactNode;
  };

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
  const productosColumns: Array<ExtendedColumn<ProductosCType>> = [
    { key: "codigo", label: "Código", minWidth: "80px", maxWidth: "100px" },
    { key: "talle", label: "Talle", minWidth: "50px", maxWidth: "70px" },
    { key: "descripcion", label: "Descripción", minWidth: "200px", maxWidth: "300px" },
    { key: "nmarca", label: "Marca", minWidth: "100px", maxWidth: "150px" },
    { key: "precio", label: "Precio", minWidth: "90px", maxWidth: "150px" },
    ...depositos.map((deposito) => ({
      key: deposito.deposito as keyof ProductosCType,
      label: deposito.deposito,
      minWidth: "70px",
      maxWidth: "90px",
      renderCell: (item: ProductosCType) => item.stockPorDeposito?.[deposito.deposito] ?? "",
    })),
    { key: "total", label: "Total", minWidth: "80px", maxWidth: "100px" },
  ];

  const COLUMNS = TableUtils.generateTableColumns<ProductosCType>(
    productosColumns.map((column) => ({
      ...column,
      minWidth: column.minWidth?.toString(),
      maxWidth: column.maxWidth?.toString(),
    }))
  );

  const COLUMNS1: TableColumn<TablaStocks>[] = [
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

          if (depositosSeleccionados.some((d) => d.deposito === deposito.deposito)) {
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
  const columnasGrid = `
  minmax(80px, 100px)
  minmax(50px, 70px)
  minmax(200px, 300px)
  minmax(100px, 150px)
  minmax(90px, 150px)
  ${"minmax(70px, 90px)".repeat(depositosDisponibles.length || 0)}
  minmax(80px, 100px)
`;

  const customTheme = TableUtils.generateTableTheme({
    columns: columnasGrid,
    width: "55rem",
    withFooter: false,
    maxHeight: "380px",
  });

  // Tengo que ver que estilos de estos estan en la funcion para generas estilos para tabla
  // y agregarle los media querys para que se adapten a las pantallas

  // ESTILOS.
  const customTheme1 = {
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

    &:nth-of-type(n+5) {
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
  }, [tablaStock, tipoPrecio]);

  // Filtramos los totales solo para depósitos y marcas seleccionadas
  productos.forEach((producto) => {
    // Verifica si la marca del producto está entre las seleccionadas
    if (marcasSeleccionadas.some((marcaModal) => marcaModal.marca === producto.marca)) {
      depositosSeleccionados.forEach(({ deposito }) => {
        const valor = parseFloat(producto.stockPorDeposito[deposito] ?? "0");
        const totalActual = totalesPorDeposito[deposito] ?? 0;
        totalesPorDeposito[deposito] = totalActual + valor;
        totalGeneral += valor;
      });
    }
  });

  // Agrega los totales al datosFooter
  depositosSeleccionados.forEach(({ deposito }) => {
    datosFooter[deposito] = totalesPorDeposito[deposito]?.toFixed(0) ?? "0";
  });

  datosFooter.total = totalGeneral.toFixed(0);

  // Llenamos las primeras 5 columnas fijas con valores vacíos
  for (let i = 1; i <= 5; i++) {
    datosFooter[`columna${i}`] = "";
  }

  depositos.forEach((deposito) => {
    const depositoId = deposito.deposito;
    const total = totalesPorDeposito[depositoId];

    // Solo mostramos el total si el depósito está seleccionado
    datosFooter[`columna${columnaIndex}`] = depositosSeleccionados.some((d) => d.deposito === depositoId)
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

  return (
    <div
      className="flex flex-col w-fit 
     overflow-hidden bg-white rounded shadow-md 
     p-0 border border-black" >
      <TablaInforme
        columnas={COLUMNS}
        datosParaTabla={productos}
        procesado={false}
        estilos={customTheme}
        footer={true}
        datosFooter={datosFooter}
        status={status}
        hayFuncionBusqueda={true}
        idsCoincidentes={idsCoincidentes}
        indiceSeleccionado={indiceSeleccionado ?? undefined}
        buscado={buscado}
        modoNavegacion={modoNavegacion}
        setUltimoIndiceBusqueda={setUltimoIndiceBusqueda}
        indiceGlobal={indiceGlobal}
        productosColumns={productosColumns}
        columnasGrid={columnasGrid}
/>
  
    </div>
  );
}
