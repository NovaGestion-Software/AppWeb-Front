import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { formatearNumero } from '../../../../utils';

//import { obtenerVentaPorHora } from "./../../../../../services/APIEndpoints";

type Info = {
  horaini: string;
  importe: number;
  cantidad: number;
  pares: number;
};

type Sucursal = {
  sucursal: string;
  nsucursal: string;
  info: Info[];
};

type ApiResponse = {
  data: {
    status: string;
    data: Sucursal[];
  };
};

type DatosVenta = Sucursal[];

interface Intervalo {
  horaini: string; // O el tipo adecuado para la hora
  importe: number; // O número, según el tipo de datos
  cantidad: number;
  pares?: number; // Propiedad opcional
}

interface ResultadoPorHora {
  importe: number;
  cantidad: number;
  pares: number;
}

interface Fechas {
  from: string;
  to: string;
}

export default function VentaHoraView() {
  const [datos, setDatos] = useState<DatosVenta | null>(null);
  const [sucursalesSeleccionadas, setSucursalesSeleccionadas] = useState<string[]>([]);
  const [sucursalesDisponibles, setSucursalesDisponibles] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (datos?.length) {
      setSucursalesSeleccionadas(datos.map((sucursal) => sucursal.nsucursal));
      setSucursalesDisponibles(datos.map((sucursal) => sucursal.nsucursal));
      setIsProcessing(true);
    }
  }, [datos]);

  const handleFetchData = async ({ from, to }: Fechas): Promise<void> => {
    try {
      const url = `https://apiphp.novagestion.com.ar/apinova/generico/obtenerVentasHora.php?_i={"_e":"12","_m":"prod","_fi":"${from}","_ff":"${to}"}`;
      const response = await axios.get(url);
      //console.log("response1", response);
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

  // const handleFetchData1 = async ({ from, to }) => {
  //   try {
  //     const data = await obtenerVentaPorHora({ from, to });
  //     console.log("response", data);
  //     setDatos(data.data.data);
  //   } catch (error) {
  //     console.error("Error en la petición:", error);
  //     alert("Error al obtener los datos");
  //   }|
  // };

  const handleClearData = () => {
    setDatos(null);
    setIsProcessing(false);
  };

  // FORMATEO SIN DECIMALES:
  // const formatearNumero = (numero) => {
  //   // Redondeamos el número y eliminamos los decimales
  //   const numeroRedondeado = Math.round(numero);

  //   // Formateamos el número con separadores de miles
  //   return numeroRedondeado.toLocaleString("es-AR");
  // };

  // FORMATEO CON 2 DECIMALES.
  //   const formatearNumero = (numero) => {
  //     // Redondeamos el número a 2 decimales
  //     const numeroRedondeado = Math.round(numero * 100) / 100;

  //     // Formateamos el número con separadores de miles y 2 decimales
  //     return numeroRedondeado.toLocaleString("es-AR", {
  //       minimumFractionDigits: 2,
  //       maximumFractionDigits: 2,
  //     });
  //   };
  // FUNCION AGRUPAR POR HORARIOS
  const agruparPorHorario = (
    data: any[],
    sucursalesSeleccionadas: string[]
  ): Record<string, ResultadoPorHora> => {
    const resultado: Record<string, ResultadoPorHora> = {};

    data
      ?.filter((sucursal) => sucursalesSeleccionadas.includes(sucursal.nsucursal)) // Filtramos por sucursales seleccionadas
      .forEach((sucursal) => {
        sucursal.info.forEach((intervalo: Intervalo) => {
          const horario = intervalo.horaini;

          if (!resultado[horario]) {
            resultado[horario] = {
              importe: 0,
              cantidad: 0,
              pares: 0,
            };
          }

          // Sumamos los valores como números
          resultado[horario].importe += intervalo.importe;
          resultado[horario].cantidad += intervalo.cantidad;
          resultado[horario].pares += intervalo.pares || 0;
        });
      });

    // Formateamos los números antes de devolverlos
    for (const horario in resultado) {
      resultado[horario].importe = parseFloat(formatearNumero(resultado[horario].importe));
    }

    return resultado;
  };

  // FUNCION PARA DEJAR DATOS PARA TABLA.
  const crearDataParaTabla = (
    datosAgrupados: Record<string, { cantidad: number; importe: string; pares: number }>
  ) => {
    // Calculamos los totales para los porcentajes
    const totalOperaciones = Object.values(datosAgrupados).reduce(
      (sum, { cantidad }) => sum + cantidad,
      0
    );

    const totalImporte = Object.values(datosAgrupados).reduce(
      (sum, { importe }) => sum + parseFloat(importe.replace(/\./g, '')),
      0
    );

    const totalPares = Object.values(datosAgrupados).reduce((sum, { pares }) => sum + pares, 0);

    const entries = Object.entries(datosAgrupados).sort((a, b) => a[0].localeCompare(b[0]));

    // Transformamos el objeto en un array de DataParaTabla
    return entries.map(([horario, datos], index) => {
      const importeNumerico = parseFloat(datos.importe.replace(/\./g, '')); // Convertimos el importe a número

      // Calculamos los porcentajes con 2 decimales
      const porcentajeOperaciones = parseFloat(
        ((datos.cantidad / totalOperaciones) * 100).toFixed(2)
      );
      const porcentajeImporte = parseFloat(((importeNumerico / totalImporte) * 100).toFixed(2));
      const porcentajePares =
        totalPares > 0 ? parseFloat(((datos.pares / totalPares) * 100).toFixed(2)) : 0;

      return {
        id: index + 1, // Usamos el horario como ID
        hora: horario,
        nOperaciones: datos.cantidad,
        porcentajeOperaciones, // Porcentaje con 2 decimales
        importe: datos.importe,
        porcentajeImporte, // Porcentaje con 2 decimales
        pares: datos.pares,
        porcentajePares, // Porcentaje con 2 decimales
      };
    });
  };
  const datosAgrupados = datos ? agruparPorHorario(datos, sucursalesSeleccionadas) : {};

  const dataParaTabla = crearDataParaTabla(datosAgrupados);

  const data = {};
  const rangePresets = [
    { label: 'Ayer', value: [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')] },
    { label: 'Ultimos 7 Dias', value: [dayjs().subtract(7, 'days'), dayjs()] },
    { label: 'Ultimos 15 Dias', value: [dayjs().subtract(15, 'days'), dayjs()] },
    { label: 'Ultimos 30 Dias', value: [dayjs().subtract(30, 'days'), dayjs()] },
    { label: 'Ultimos 90 Dias', value: [dayjs().subtract(90, 'days'), dayjs()] },
    { label: 'Este Mes', value: [dayjs().startOf('month'), dayjs()] },
    {
      label: 'Mes Pasado',
      value: [
        dayjs().subtract(1, 'month').startOf('month'),
        dayjs().subtract(1, 'month').endOf('month'),
      ],
    },
    {
      label: 'Año Pasado',
      value: [
        dayjs().subtract(1, 'year').startOf('year'),
        dayjs().subtract(1, 'year').endOf('year'),
      ],
    },
  ];

  const handleConfirm = () => {
    console.log('Estas son las seleccionadas', sucursalesDisponibles);
  };

  return (
    <div className=" w-full h-full p-4 overflow-hidden ">
      <h1 className="text-3xl font-bold">Venta Por Hora</h1>

      {/** BOTONERA */}
      <div className="grid grid-cols-12 grid-rows-1 gap-4 mt-6 rounded p-2  h-16 items-center ">
        {/**ingresar fechas y Botones de procesado */}
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

        {/**modales y funcionabilidades */}
        <div className="col-span-5 col-start-7 2xl:col-span-4 2xl:col-start-9   ">
          <GrupoBotonesFunciones
            data={datosAgrupados}
            sucursales={sucursalesDisponibles}
            setSucursalesSeleccionadas={setSucursalesSeleccionadas}
            isProcessing={isProcessing}
            store={false}
            planes={false}
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
        <div className={`col-start-3 2xl:col-start-3 `}>
          <Tabla01 dataParaTabla={dataParaTabla} isProcessing={isProcessing} />
        </div>
      </div>
    </div>
  );
}
