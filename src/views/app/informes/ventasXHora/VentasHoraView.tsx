import { useEffect, useState } from 'react';
import { obtenerVentasHora } from '@/services/ApiPhpService';
import FechasInforme from '../_components/FechasInforme';
import HerramientasComponent from './components/HerramientasComponent';
import TablaVentaPorHora from './components/TablaVentaPorHora';
import ViewTitle from '@/Components/ui/Labels/ViewTitle';
import { formatearNumero } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { FechasRango } from '@/types';

type Info = {
  horaini: string;
  importe: string;
  cantidad: number;
  pares: number;
};

type Sucursal = {
  sucursal: string;
  nsucursal: string;
  info: Info[];
};

type DatosVenta = Sucursal[] | null;

type DatosAgrupados = Record<
  string,
  { cantidad: number; importe: string; pares: number }
>;

type Totales = {
  totalImporte: number;
  totalOperaciones: number;
  totalPares: number;
};

export default function VentasHoraView() {
  const [datos, setDatos] = useState<DatosVenta | null>(null);
  const [fechas, setFechas] = useState<FechasRango>({ from: null, to: null });
  console.log(fechas);

  const [sucursalesSeleccionadas, setSucursalesSeleccionadas] = useState<string[]>([]);
  const [sucursalesDisponibles, setSucursalesDisponibles] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [footer, setFooter] = useState<boolean>(false);
  const [foco, setFoco] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ['ventas-hora'],
    queryFn: () => obtenerVentasHora({ from: '2025-02-01', to: '2025-03-01' }),
  });

  console.log(data);
  // SETEAR ESTADOS SI DATOS TIENE INFO.
  useEffect(() => {
    if (datos?.length) {
      setSucursalesSeleccionadas(datos.map((sucursal) => sucursal.nsucursal));
      setSucursalesDisponibles(datos.map((sucursal) => sucursal.nsucursal));
      setIsProcessing(true);
      setFooter(true);
    }
  }, [datos]);

  // SACAR FOOTER SI NO HAY DATOS SELECCIONADOS PARA MOSTRARSE
  useEffect(() => {
    if (!sucursalesSeleccionadas?.length) {
      setFooter(false);
    } else {
      setFooter(true);
    }
  }, [sucursalesSeleccionadas]);

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
      if (e.key === "Escape" && datos) {
        handleClearData();
      }
    };

    // Escuchar el evento de la tecla Escape
    window.addEventListener("keydown", handleEscapeKey);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [datos]);
  

  // FUNCION PARA AGRUPAR SEGUN EL RANGO DE HORARIOS
  const agruparPorHorario = (
    data: DatosVenta,
    sucursalesSeleccionadas: string[] | null
  ) => {
    const resultado: Record<
      string,
      { importe: string; cantidad: number; pares: number }
    > = {};
    let totalImporte = 0;
    let totalOperaciones = 0;
    let totalPares = 0;

    if (!sucursalesSeleccionadas) {
      return {
        datosAgrupados: resultado,
        totalImporte,
        totalOperaciones,
        totalPares,
      };
    }

    data
      ?.filter((sucursal) =>
        sucursalesSeleccionadas.includes(sucursal.nsucursal)
      )
      .forEach((sucursal) => {
        sucursal.info.forEach((intervalo) => {
          const horario = intervalo.horaini;

          if (!resultado[horario]) {
            resultado[horario] = { importe: "0", cantidad: 0, pares: 0 };
          }

          // Convertimos el importe a número, sumamos y luego guardamos como string
          const importeNumerico =
            parseFloat(intervalo.importe.replace(/\./g, "")) || 0;
          const nuevoImporte =
            parseFloat(resultado[horario].importe.replace(/\./g, "")) +
            importeNumerico;
          resultado[horario].importe = nuevoImporte.toString(); // Guardamos como string

          // Sumamos otros valores
          resultado[horario].cantidad += intervalo.cantidad;
          resultado[horario].pares += intervalo.pares || 0;

          // Sumamos a los totales globales
          totalImporte += importeNumerico;
          totalOperaciones += intervalo.cantidad;
          totalPares += intervalo.pares || 0;
        });
      });

    // Formateamos los importes en el resultado
    for (const horario in resultado) {
      resultado[horario].importe = formatearNumero(
        parseFloat(resultado[horario].importe)
      );
    }

    return {
      datosAgrupados: resultado,
      totalImporte,
      totalOperaciones,
      totalPares,
    };
  };

  // FUNCION PARA ORDENAR LOS DATOS SEGUN LA ESTRUCTURA PARA LA TABLA
  const crearDataParaTabla = ({
    datosAgrupados,
    totalImporte,
    totalOperaciones,
    totalPares,
  }: { datosAgrupados: DatosAgrupados } & Totales) => {
    const entries = Object.entries(datosAgrupados).sort((a, b) =>
      a[0].localeCompare(b[0])
    );

    return entries.map(([horario, datos], index) => {
      const importeNumerico = parseFloat(datos.importe.replace(/\./g, ""));

      return {
        id: index + 1,
        hora: horario,
        nOperaciones: datos.cantidad,
        porcentajeOperaciones:
          totalOperaciones > 0
            ? parseFloat(((datos.cantidad / totalOperaciones) * 100).toFixed(2))
            : 0,
        importe: datos.importe,
        porcentajeImporte:
          totalImporte > 0
            ? parseFloat(((importeNumerico / totalImporte) * 100).toFixed(2))
            : 0,
        pares: datos.pares,
        porcentajePares:
          totalPares > 0
            ? parseFloat(((datos.pares / totalPares) * 100).toFixed(2))
            : 0,
      };
    });
  };

  //  IMPLEMENTACION DE FUNCIONES
  const { datosAgrupados, totalImporte, totalOperaciones, totalPares } =
    agruparPorHorario(datos, sucursalesSeleccionadas);
  const dataParaTabla = crearDataParaTabla({
    datosAgrupados,
    totalImporte,
    totalOperaciones,
    totalPares,
  });

  // FOOTER TABLA 1
  const datosParaFooter = {
    id: "",
    hora: "",
    totalOperaciones: totalOperaciones,
    porcentajeOperaciones: "",
    totalPares: totalPares,
    porcentajePares: "",
    totalImporte: totalImporte,
    porcentajeImporte: "",
  };

  // HANDLE FETCH
  const handleFetchData = async (params: FechasRango) => {
    const { from, to } = params;

    try {
      const data = await obtenerVentasHora({ from, to });
      // Comprobación de la respuesta
      if (!data || !data.data || data.data.length === 0) {
        alert('La petición solicitada no contiene información');
        // console.log('response:', data);
        setFoco(true);
        return;
      }
      setDatos(data.data);
      // console.log('response:', data.data);
    } catch (error) {
      console.error('Error en la petición:', error);
      alert('Error al obtener los datos');
      setFoco(true);
    }
  };

  // CLEAR DATA
  const handleClearData = () => {
    setDatos(null);
    setIsProcessing(false);
    setFooter(false);
    setFoco(true);
  };

  return (
    <div className=" w-full h-full p-4 pt-0 overflow-hidden ">
      <ViewTitle title={'Ventas por Hora'} />

      {/** BOTONERA */}
      <div className="grid grid-cols-12 grid-rows-1 gap-4 mt-6 rounded p-2  h-16 items-center ">
        {/**ingresar fechas y Botones de procesado */}
        <div className="col-start-2 col-span-6 2xl:col-span-6 2xl:col-start-2 ">
          <FechasInforme
            setFocus={foco}
            setFechas={setFechas}
            onFetchData={handleFetchData} // Ahora usa la nueva función
            onClearData={handleClearData}
            isProcessing={isProcessing}
            placeholders={["Inicio", "Fin"]}
            buttonText={{ fetch: "Procesar", clear: "Borrar" }}
            whitButttons={true}
          />
        </div>

        {/**modales y funcionabilidades */}
        <div className="col-span-5 col-start-8 2xl:col-span-4 2xl:col-start-8  ">
          <HerramientasComponent
            data={dataParaTabla}
            sucursales={sucursalesDisponibles}
            sucursalesSeleccionadas={sucursalesSeleccionadas}
            setSucursalesSeleccionadas={setSucursalesSeleccionadas}
            isProcessing={isProcessing}
            store={false}
            planes={false}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2 py-5 pl-4">
        {isProcessing && (
          <div className="col-span-1 col-start-2 2xl:right-0 2xl:col-start-1 2xl:left-4 relative right-4  bg-white rounded-lg p-4  h-fit w-44 font-semibold text-base shadow-md ">
            <h3 className="font-bold text-xs 2xl:text-sm text-green-700 mb-2">
              Sucursales:
            </h3>
            <ul className="list-disc list-inside w-full text-sm 2xl:text-sm">
              {sucursalesDisponibles.map((sucursal, index) => (
                <li
                  key={index}
                  className={` ${
                    sucursalesSeleccionadas.includes(sucursal)
                      ? "text-green-600" // Estilo para sucursales seleccionadas
                      : "text-gray-400 line-through" // Estilo para sucursales no seleccionadas
                  }`}
                >
                  {sucursal}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={`col-start-4 2xl:col-start-3 `}>
          <TablaVentaPorHora
            isProcessing={isProcessing}
            datos={dataParaTabla}
            datosFooter={datosParaFooter}
            footer={footer}
          />
        </div>
      </div>
    </div>
  );
}
