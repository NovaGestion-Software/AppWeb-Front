import { useEffect } from "react";
import { useStockPorSeccion } from "@/views/app/stockSeccion/store/useStockPorSeccion";
import {
  MarcaModal,
  ProductoAgrupado,
} from "@/types";
import TablaInforme from "@/frontend-resourses/components/Tables/TablaDefault/TablaDefault";
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
  } = useStockPorSeccion();
  //depositos utiliza stock renderizado
  const widthBase = "71.2rem";
  const width1440px = "60.3rem";
  const width1536px = "71.3rem";
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
    minWidth?: string;
    maxWidth?: string ;
    renderCell?: (item: T) => React.ReactNode;
    resaltar?: boolean;
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
    { key: "codigo", label: "Código", minWidth: "80px", maxWidth: "100px", resaltar: true },
    { key: "talle", label: "Talle", minWidth: "50px", maxWidth: "70px" },
    {
      key: "descripcion",
      label: "Descripción",
      minWidth: "200px",
      maxWidth: "300px",
    },
    { key: "nmarca", label: "Marca", minWidth: "100px", maxWidth: "150px" },
    { key: "precio", label: "Precio", minWidth: "90px", maxWidth: "150px" },
    ...depositos.map((deposito) => ({
      key: deposito.deposito as keyof ProductosCType,
      label: deposito.deposito,
      minWidth: "70px",
      maxWidth: "90px",
      resaltar: true,
      renderCell: (item: ProductosCType) =>
        item.stockPorDeposito?.[deposito.deposito] ?? "",
    })),
    { key: "total", label: "Total", minWidth: "80px", maxWidth: "100px" , resaltar: true},
  ];

  const COLUMNS = TableUtils.generateTableColumns<ProductosCType>(
    productosColumns.map((column) => ({
      ...column,
      minWidth: column.minWidth?.toString(),
      maxWidth: column.maxWidth?.toString(),
    }))
  );

  const columnasGrid = TableUtils.applyWidthColumns(productosColumns);

  const customTheme = TableUtils.generateTableTheme({
    columns: columnasGrid,
    width: widthBase,
    width1440px: width1440px,
    width1536px: width1536px,
    maxHeight: "380px",
  });

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
    if (
      marcasSeleccionadas.some(
        (marcaModal) => marcaModal.marca === producto.marca
      )
    ) {
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
    <div
      className="flex flex-col w-fit 
     overflow-hidden rounded shadow-md   "
    >
      <TablaInforme
        columnas={COLUMNS}
        datosParaTabla={productos}
        procesado={false}
        estilos={customTheme}
        status={status}
        hayFuncionBusqueda={true}
        idsCoincidentes={idsCoincidentes}
        indiceSeleccionado={indiceSeleccionado ?? undefined}
        buscado={buscado}
        modoNavegacion={modoNavegacion}
        setUltimoIndiceBusqueda={setUltimoIndiceBusqueda}
        indiceGlobal={indiceGlobal}
        objectColumns={productosColumns}
        footerWidth={widthBase}
        columnasGrid={columnasGrid}
        footer={true}
        datosFooter={datosFooter}
        footerWidth={widthBase}
        footerWidth1440px={width1440px}
        footerWidth1536px={width1536px}
      />
    </div>
  );
}
