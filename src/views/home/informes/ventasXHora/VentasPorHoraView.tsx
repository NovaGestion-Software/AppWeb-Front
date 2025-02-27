import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
// import FechasInforme from "../Componentes/FechasDeInforme";
// import GrupoBotonesFunciones from "../Componentes/GrupoBotonesFunciones";
// import Tabla01 from "../Componentes/Tabla01";
// import { DataFalsa1 } from "./js/dataFalsa";

import { formatearNumero } from '../../../../utils';
import apiPhp from '../../../../lib/axiosPhp';
import FechasInforme from './components/FechasDeInforme';
import GrupoBotonesFunciones from './components/GrupoBotonesFunciones';
import Tabla01 from './components/Tabla01';

interface Intervalo {
  horaini: string; // O el tipo adecuado para la hora
  importe: string; // O número, según el tipo de datos
  cantidad: number;
  pares?: number; // Propiedad opcional
}

interface ResultadoPorHora {
  importe: string;
  cantidad: number;
  pares: string;
}

// Tipo de la entrada de la tabla final
export interface DataParaTabla {
  id: number; // ID único de la fila (basado en el índice)
  hora: string; // Horario
  nOperaciones: number; // Número de operaciones
  porcentajeOperaciones: number; // Porcentaje de operaciones con respecto al total
  importe: string; // Importe formateado como string
  porcentajeImporte: number; // Porcentaje del importe con respecto al total
}

export default function VentaPorHoraView() {
  const [datos, setDatos] = useState([]);
  const [sucursalesSeleccionadas, setSucursalesSeleccionadas] = useState<string[]>([]);
  const [sucursalesDisponibles, setSucursalesDisponibles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // useEffect(() => {
  //   if (datos?.length) {
  //     setSucursalesSeleccionadas(datos.map((sucursal) => sucursal.nsucursal));
  //     setSucursalesDisponibles(datos.map((sucursal) => sucursal.nsucursal));
  //     setIsProcessing(true);
  //   }
  // }, [datos]);

  const handleClearData = () => {
    setDatos([]);
    setIsProcessing(false);
  };

  const handleFetchData = async ({ from, to }: { from: string; to: string }) => {
    try {
      console.log('fechas', from, to);
      const url = `/apinova/generico/obtenerVentasHora.php?_i={"_e":"12","_m":"prod","_fi":"${from}","_ff":"${to}"}`;
      const response = await apiPhp(url);
      console.log('response1', response);
      if (response.status === 200) {
        setDatos(response.data.data);
      } else {
        console.error('Error en la petición:', response.statusText);
        alert('Error al obtener los datos');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      alert('Error al obtener los datos');
    }
  };

  // // FUNCION AGRUPAR POR HORARIOS
  const agruparPorHorario = (
    data: any[],
    sucursalesSeleccionadas: string[]
  ): Record<string, ResultadoPorHora> => {
    const resultado: Record<string, ResultadoPorHora> = {};

    data
      ?.filter((sucursal: any) => sucursalesSeleccionadas.includes(sucursal.nsucursal)) // Filtramos por sucursales seleccionadas
      .forEach((sucursal: any) => {
        sucursal.info.forEach((intervalo: Intervalo) => {
          const horario = intervalo.horaini;

          if (!resultado[horario]) {
            resultado[horario] = {
              importe: '0',
              cantidad: 0,
              pares: '0',
            };
          }

          resultado[horario].importe += parseFloat(intervalo.importe);
          resultado[horario].cantidad += intervalo.cantidad;
          resultado[horario].pares += intervalo.pares || 0;
        });
      });

    // Formateamos los números antes de devolverlos
    for (const horario in resultado) {
      resultado[horario].importe = formatearNumero(parseFloat(resultado[horario].importe));
    }

    return resultado;
  };

  // Uso de la función
  const datosAgrupados = agruparPorHorario(datos, sucursalesSeleccionadas);

  console.log(datosAgrupados);

  // // FUNCION PARA DEJAR DATOS PARA TABLA.
  // Tipo de la función que recibe los datos agrupados y devuelve los datos de la tabla
  const crearDataParaTabla = (
    datosAgrupados: Record<string, ResultadoPorHora>
  ): DataParaTabla[] => {
    // Calculamos los totales para los porcentajes
    const totalOperaciones = Object.values(datosAgrupados).reduce(
      (sum, { cantidad }) => sum + cantidad,
      0
    );

    const totalImporte = Object.values(datosAgrupados).reduce(
      (sum, { importe }) => sum + parseFloat(importe.replace(/\./g, '')),
      0
    );

    const entries = Object.entries(datosAgrupados).sort((a, b) => a[0].localeCompare(b[0]));

    // Transformamos el objeto en un array de DataParaTabla
    return entries.map(([horario, datos], index) => {
      const importeNumerico = parseFloat(datos.importe.replace(/\./g, '')); // Convertimos el importe a número

      return {
        id: index + 1, // Usamos el índice como ID
        hora: horario,
        nOperaciones: datos.cantidad,
        porcentajeOperaciones: Math.round((datos.cantidad / totalOperaciones) * 100),
        importe: datos.importe,
        porcentajeImporte: Math.round((importeNumerico / totalImporte) * 100),
      };
    });
  };

  const dataParaTabla = crearDataParaTabla(datosAgrupados);

  // const data = {};
  const rangePresets = [
    { label: 'Ultimos 7 Dias', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Ultimos 14 Dias', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Ultimos 30 Dias', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Ultimos 90 Dias', value: [dayjs().add(-90, 'd'), dayjs()] },
  ];

  const handleConfirm = () => {
    console.log('Estas son las seleccionadas', sucursalesDisponibles);
  };

  return (
    <div className="border-2 w-full h-full p-4 overflow-hidden ">
      <h1 className="text-3xl font-bold">Venta Por Hora</h1>

      {/** BOTONERA */}
      <div className="grid grid-cols-12 grid-rows-1 gap-4 mt-6 rounded p-2  h-16 items-center ">
        <div className="col-start-1 col-span-5 2xl:col-start-2 ">
          <FechasInforme
            onFetchData={handleFetchData}
            onClearData={handleClearData}
            isProcessing={isProcessing}
            placeholders={['Inicio', 'Fin']}
            buttonText={{ fetch: 'Procesar', clear: 'Borrar' }}
            whitButttons={true}
            presets={rangePresets}
          />
        </div>

        <div className="col-span-5 col-start-7 2xl:col-span-4 2xl:col-start-9   ">
          <GrupoBotonesFunciones
            data={datosAgrupados}
            sucursales={sucursalesDisponibles}
            onConfirm={handleConfirm}
            // sucursalesSeleccionadas={sucursalesSeleccionadas}
            setSucursalesSeleccionadas={setSucursalesSeleccionadas}
            isProcessing={isProcessing}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2 py-5 pl-4">
        {isProcessing && (
          <div className="col-span-1  bg-white rounded-lg p-4  h-fit w-44 font-semibold text-base shadow-md ">
            <h3 className="font-bold text-xs 2xl:text-sm text-green-700 mb-2">Viendo:</h3>
            <ul className="list-disc list-inside w-full text-sm 2xl:text-sm">
              {sucursalesDisponibles.map((sucursal, index) => (
                <li
                  key={index}
                  className={` ${
                    sucursalesSeleccionadas.includes(sucursal)
                      ? 'text-green-600' // Estilo para sucursales seleccionadas
                      : 'text-gray-400 line-through' // Estilo para sucursales no seleccionadas
                  }`}
                >
                  {sucursal}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="col-start-3 2xl:col-start-3">
          <Tabla01 dataParaTabla={dataParaTabla} />
        </div>
      </div>
    </div>
  );
}
