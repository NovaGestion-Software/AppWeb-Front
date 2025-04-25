import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useVentasHoraStore } from "@/store/useVentasHoraStore";
import { obtenerVentasHora } from "@/services/ApiPhpService";
import { ApiResponse, FechasRango, VentaPorHora } from "@/types";
import { formatearNumero } from "@/utils";
import ViewTitle from "@/Components/ui/Labels/ViewTitle";
import dayjs from "dayjs";




import HerramientasComponent from "./components/HerramientasComponent";
import TablaVentaPorHora from "./components/TablaVentaPorHora";
import showAlert from "@/utils/showAlert";
import ModalFiltro from "@/frontend-resourses/components/Modales/ModalFiltro";
import ActionButton from "@/frontend-resourses/components/Buttons/ActionButton";
import GraficoConZoom from "@/frontend-resourses/components/Charts/GraficoConZoom";
import RangeDatesInput from "@/frontend-resourses/components/Inputs/RangeDatesInput";
import {
  extraerItems,
  extraerItemsDeIndice,
  agruparPorIndice,
  crearDataParaTablaModular,
  obtenerValorMaximoConIndice
} from "@/frontend-resourses/utils/dataManipulation";
import { Destacados } from "@/frontend-resourses/components/Complementos/Destacados";
import { ListaFiltrosAplicados } from "@/frontend-resourses/components/Complementos/ListaFiltrosAplicados";

type ConfigKeys = {
  filtroKey: string;
  agrupadorKey: string;
  innerArrayKey: string;
  sumaKeys: string[];
  convertir: string[];
};
type ColumnaTabla = {
  key: string; // Clave interna, ej: "importe"
  label: string; // Clave en el objeto final, ej: "importeFormateado"
  calcularPorcentaje?: boolean; // Si se calcula %
  totalKey?: string; // A cuál total se relaciona
  parseNumber?: boolean; // Si hay que parsear antes de hacer % (como "importe" con punto)
};
type ConfigTabla = {
  agrupadorKey: string; // ej: "hora"
  columnas: ColumnaTabla[];
};

export default function VentasHoraView() {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [footer, setFooter] = useState<boolean>(false);
  const [foco, setFoco] = useState<boolean>(false);
  const [showModalSucursales, setShowModalSucursales] = useState(false);
  //store
  const {
    status,
    fechas,
    setFechas,
    sucursalesSeleccionadas,
    sucursalesDisponibles,
    ventasPorHora,
    setVentasPorHora,
    setSucursalesSeleccionadas,
    setSucursalesDisponibles,
    setStatus,
    clearVentasPorHora,
    clearSucursalesDisponibles,
    clearSucursalesSeleccionadas,
  } = useVentasHoraStore();
  // extrae horarios para indice.
  const horariosnew = ventasPorHora ? extraerItemsDeIndice(ventasPorHora, "info", "horaini") : [];

  // funcion agrupar por horario, te suma los totales en base a sumKey
  const config: ConfigKeys = {
    filtroKey: "nsucursal",
    agrupadorKey: "horaini",
    innerArrayKey: "info",
    sumaKeys: ["importe", "cantidad", "pares"],
    convertir: ["importe"],
  };

  const configTabla: ConfigTabla = {
    agrupadorKey: "hora",
    columnas: [
      {
        key: "cantidad",
        label: "nOperaciones",
        calcularPorcentaje: true,
        totalKey: "cantidad",
      },
      {
        key: "importe",
        label: "importe",
        calcularPorcentaje: true,
        totalKey: "importe",
        parseNumber: true,
      },
      {
        key: "pares",
        label: "pares",
        calcularPorcentaje: true,
        totalKey: "pares",
      },
    ],
  };
  const { datos, totales } = agruparPorIndice(
    ventasPorHora,
    sucursalesSeleccionadas,
    horariosnew,
    config,
    formatearNumero 
  );
  // crea datos en estructura de tabla.
  const filasGenericas = crearDataParaTablaModular(datos, totales, configTabla);
  // seteo de filas segun VentaPorHora
  const filas: VentaPorHora[] = filasGenericas.map((fila) => ({
    id: fila.id as number,
    hora: fila.hora as string,
    nOperaciones: fila.nOperaciones as number,
    porcentajeNOperaciones: fila.porcentajeNOperaciones as string,
    importe: fila.importe as string,
    porcentajeImporte: fila.porcentajeImporte as string,
    pares: fila.pares as number,
    porcentajePares: fila.porcentajePares as string,
  }));

  // llamado a fetch
  const { mutate } = useMutation<ApiResponse, Error, FechasRango>({
    mutationFn: () => obtenerVentasHora(fechas),
    onMutate: () => {
      setStatus("pending");
    },
    onError: (error) => {
      console.error("Error al obtener los datos:", error);
      setStatus("error");
    },
    onSuccess: (data) => {
      // console.log(data.data);
      if (data.data.length === 0) {
        showAlert({
          text: "El rango de fecha seleccionado no contiene información",
          icon: "error",
          cancelButtonText: "Cerrar",
          showCancelButton: true,
          timer: 2200,
        });
      }
      setVentasPorHora(data.data);
      // setSucursalesDisponibles(data.data.map((sucursal) => sucursal.nsucursal));
      // setSucursalesSeleccionadas(data.data.map((sucursal) => sucursal.nsucursal));
      // setIsProcessing(true);
      // setFooter(true);
      setStatus("success");
    },
    onSettled: () => {
      setStatus("idle");
    },
  });

  // esto es para setar los highLight
  const maxImporteValor = obtenerValorMaximoConIndice(filas, "importe", "hora");
  const maxImporteFormateado = formatearNumero(maxImporteValor.maxValue);

  // formateo con miles y centavos para el footer
  const totalImporteFormateado = formatearNumero(totales.importe);

  // FOOTER TABLA 1
  const datosParaFooter = {
    hora: "",
    nOperaciones: totales.cantidad,
    porcentajeOperaciones: "",
    pares: totales.pares,
    porcentajePares: "",
    importe: totalImporteFormateado,
    porcentajeImporte: "",
  };
  // render sucursalesitems
  const renderSucursalesItem = (item: string) => {
    return <>{item}</>;
  };

  // SETEAR ESTADOS SI DATOS TIENE INFO.
  useEffect(() => {
    if (ventasPorHora?.length) {
      setIsProcessing(true);
      extraerItems({
        data: ventasPorHora,
        itemKey: "nsucursal",
        setItemsDisponibles: setSucursalesDisponibles,
        itemsSeleccionados: sucursalesSeleccionadas,
        setItemsSeleccionados: setSucursalesSeleccionadas,
      });
    }
  }, [ventasPorHora]);
  // LIMPIAR EL ESTADO FOCO A LOS 0.5S
  useEffect(() => {
    if (foco) {
      const timer = setTimeout(() => {
        setFoco(false); // Restaurar foco a false después de 2 segundos
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [foco]);
  // USAR ESCAPE PARA VACIAR INFORME
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && ventasPorHora) {
        handleClearData();
      }
    };
    window.addEventListener("keydown", handleEscapeKey);
    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [ventasPorHora]);
  // HANDLE FETCH
  const handleFetchData = async (dates: FechasRango) => {
    try {
      mutate(dates);
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Error al obtener los datos");
      setFoco(true);
    }
  };
  // CLEAR DATA
  const handleClearData = () => {
    setIsProcessing(false);
    setFooter(false);
    clearVentasPorHora();
    clearSucursalesDisponibles();
    clearSucursalesSeleccionadas();
    setFoco(true);
  };

  // seteo de destacados.
  const indiceString = `${dayjs(fechas.from).format("DD/MM/YYYY")} - ${dayjs(fechas.to).format("DD/MM/YYYY")}`;
  const destacadosObject = {
    indice: indiceString,
    destacados: [
      { label: "Mayor Importe $", valor: maxImporteFormateado },
      { label: "Horario", valor: maxImporteValor.indice },
    ],  
  };
 
 
  return (
    <div className="h-screen ">
      <ViewTitle title={"Ventas por Hora"} />

      <div className="flex flex-col h-fit mx-4">
        {/** BOTONERA */}
        <div className="grid grid-cols-12 grid-rows-1 h-11 px-4 gap-4 mt-2 mb-1 rounded">
          {/**ingresar fechas y Botones de procesado */}
          <div className="col-start-1 col-span-6 2xl:col-span-4 2xl:col-start-3 ">
            <RangeDatesInput
              conBotones={true}
              textoBotones={{ fetch: "Procesar", clear: "Borrar" }}
              onFetchData={handleFetchData}
              onClearData={handleClearData}
              setFechas={setFechas}
              estado={status}
              setFocus={foco}
              estaProcesado={isProcessing}
            />
          </div>

          {/**modales y funcionabilidades */}
          <div
            className="flex gap-1 items-center justify-center h-10 bg-white rounded-lg col-span-3 col-start-8
           2xl:col-span-2 2xl:col-start-8"
          >
            <ActionButton
              text="Sucursales"
              onClick={() => setShowModalSucursales(true)}
              disabled={false}
              color="blue"
              size="xs"
            />{" "}
            <HerramientasComponent
              data={filas}
              isProcessing={isProcessing}
              datosParaFooter={datosParaFooter}
              disabled={false}
              modalSucursales={false}
            />
            <ModalFiltro
              title="Sucursales"
              renderItem={renderSucursalesItem}
              showModal={showModalSucursales}
              setShowModal={setShowModalSucursales}
              datos={sucursalesDisponibles}
              disabled2={false}
              disabled={false}
              itemsDisponibles={sucursalesDisponibles}
              itemsSeleccionados={sucursalesSeleccionadas}
              setItemsDisponibles={setSucursalesDisponibles}
              setItemsSeleccionados={setSucursalesSeleccionadas}
            />
          </div>
        </div>

        <div
          className="grid grid-cols-12 gap-2 ml-4 2xl:h-[48rem]
         2xl:ml-0 2xl:mt-5 overflow-hidden"
        >
          {isProcessing && (
            <div className="col-span-5 2xl:col-start-2  flex flex-col items-center justify-evenly 2xl:justify-evenly 2xl:items-center transition-all duration-500 ease-out">
              {/* Lista Sucursales */}
           <ListaFiltrosAplicados itemsDisponibles={sucursalesDisponibles} itemsSeleccionados={sucursalesSeleccionadas} />

              {/* Información de ventas */}
              <Destacados {...destacadosObject} />


              {/* Gráfico */}
              <div className="w-full">
                <GraficoConZoom
                  datosParaGraficos={filas}
                  index="horas"
                  widthGraficoModal="w-[60rem]"
                  categorias={["Operaciones"]}
                  tituloModal="N° Operaciones por Hora"
                />
              </div>
            </div>
          )}

          <div
            className={`flex bg-white h-[36.8rem] rounded-md border-gray-300
               shadow shadow-gray-600 w-fit overflow-hidden ml-5 transition-all duration-500 ease-out  ${
                 isProcessing
                   ? "col-start-6 col-span-2 2xl:col-start-7 transform"
                   : " col-start-3 2xl:col-start-4 transform translate-x-0"
               }`}
          >
            <TablaVentaPorHora
              isProcessing={isProcessing}
              dataParaTabla={filas}
              datosFooter={datosParaFooter}
              footer={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
// SACAR FOOTER SI NO HAY DATOS SELECCIONADOS PARA MOSTRARSE
// useEffect(() => {
//   if (dataParaTabla?.length) {
//     setFooter(true);
//   } else {
//     setFooter(false);
//   }
// }, [sucursalesSeleccionadas]);

// props: data, sucursalesSeleccionadas (filtro), itemsDeIndice (horario), keys de agrupacion.
// const agruparPorHorario = (
//   data: Sucursal[] | null,
//   sucursalesSeleccionadas: string[] | null
// ) => {
//   const resultado: Record<string,  { importe: string; cantidad: number; pares: number }> = {};

//   let totalImporte = 0;
//   let totalOperaciones = 0;
//   let totalPares = 0;

//   if (!sucursalesSeleccionadas || sucursalesSeleccionadas.length === 0) {
//     // console.log('No se seleccionaron sucursales');
//     return {
//       datosAgrupados: resultado,
//       totalImporte, // Número sin formatear
//       totalOperaciones, // Número sin formatear
//       totalPares, // Número sin formatear
//     };
//   }

//   // 2️⃣ Inicializamos el resultado con todos los horarios posibles, incluso vacíos
//   horariosnew.forEach((horario) => {
//     resultado[horario] = { importe: "0", cantidad: 0, pares: 0 }; // Aseguramos que todos los horarios tengan un valor inicial
//   });

//   // 3️⃣ Procesamos las sucursales seleccionadas y agrupamos por horario
//   data?.filter((sucursal) => sucursalesSeleccionadas.includes(sucursal.nsucursal))
//     .forEach((sucursal) => {
//       sucursal.info.forEach((intervalo) => {
//         const horario = intervalo.horaini.trim(); // Aseguramos que el horario esté bien formateado

//         // Solo actualizamos el horario si ya existe en el resultado
//         if (resultado[horario]) {
//           // Convertimos el importe correctamente respetando los decimales
//           const importeNumerico = parseFloat(intervalo.importe) || 0;

//           // Sumar correctamente sin perder decimales
//           totalImporte += importeNumerico;
//           totalImporte = parseFloat(totalImporte.toFixed(2));

//           // Actualizamos el importe en el resultado sin perder precisión
//           let importeActual = parseFloat(resultado[horario].importe) || 0;
//           importeActual = parseFloat(importeActual.toFixed(2));
//           let nuevoImporte = importeActual + importeNumerico;
//           resultado[horario].importe = nuevoImporte.toString(); // Guardamos como string sin formatear aún

//           // Sumar otros valores
//           resultado[horario].cantidad += intervalo.cantidad;
//           resultado[horario].pares += intervalo.pares || 0;

//           // Sumar a los totales globales
//           totalOperaciones += intervalo.cantidad;
//           totalPares += intervalo.pares || 0;
//         }
//       });
//     });

//   // **Formateamos los importes en el resultado antes de devolverlos**
//   for (const horario in resultado) {
//     resultado[horario].importe = formatearNumero(
//       parseFloat(resultado[horario].importe)
//     );
//   }

//   return {
//     datosAgrupados: resultado,
//     totalImporte, // Número con 2 decimales
//     totalOperaciones, // Número entero
//     totalPares, // Número entero
//   };
// };

// const crearDataParaTabla = ({
//   datosAgrupados,
//   totalImporte,
//   totalOperaciones,
//   totalPares,
// }: { datosAgrupados: DatosAgrupados } & Totales) => {

//   const entries = Object.entries(datosAgrupados).sort((a, b) =>
//     a[0].localeCompare(b[0])
//   );
//   // console.log(entries);
//   return entries.map(([horario, datos], index) => {
//     const importeNumerico = parseFloat(datos.importe.replace(/\./g, ""));

//     // console.log(`Importe: ${importeNumerico}`)
//     // console.log(horario);
//     return {
//       id: index + 1,
//       hora: horario,
//       nOperaciones: datos.cantidad,
//       porcentajeOperaciones:
//         totalOperaciones > 0
//           ? ((datos.cantidad / totalOperaciones) * 100).toFixed(2)
//           : 0,
//       importe: datos.importe,
//       porcentajeImporte:
//         totalImporte > 0
//           ? ((importeNumerico / totalImporte) * 100).toFixed(2)
//           : 0,
//       pares: datos.pares,
//       porcentajePares:
//         totalPares > 0 ? ((datos.pares / totalPares) * 100).toFixed(2) : 0,
//     };
//   });
// };

// IMPLEMENTACION DE FUNCIONES
// const { datosAgrupados, totalImporte, totalOperaciones, totalPares } = agruparPorHorario(ventasPorHora, sucursalesSeleccionadas);
// console.log('datos agrupados', datosAgrupados)

// // console.log(datosAgrupados);
// const dataParaTabla = crearDataParaTabla({
//   datosAgrupados,
//   totalImporte,
//   totalOperaciones,
//   totalPares,
// });
// console.log('totales', totalImporte, totalOperaciones, totalPares)
