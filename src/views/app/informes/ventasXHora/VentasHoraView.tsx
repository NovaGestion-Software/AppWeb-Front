import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useVentasHoraStore } from '@/store/useVentasHoraStore';
import { obtenerVentasHora } from '@/services/ApiPhpService';
import { ApiResponse, FechasRango, Sucursal, VentaPorHora } from '@/types';
import { formatearNumero } from '@/utils';
import ViewTitle from '@/Components/ui/Labels/ViewTitle';
import FechasInforme from '../_components/FechasInforme';
import HerramientasComponent from './components/HerramientasComponent';
import TablaVentaPorHora from './components/TablaVentaPorHora';
import showAlert from '@/utils/showAlert';
import GraficoInforme from '../_components/GraficoInforme';

type DatosAgrupados = Record<string, { cantidad: number; importe: string; pares: number }>;

type Totales = {
  totalImporte: number;
  totalOperaciones: number;
  totalPares: number;
};

export default function VentasHoraView() {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [footer, setFooter] = useState<boolean>(false);
  const [foco, setFoco] = useState<boolean>(false);

  const {
    fechas,
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

  const { mutate } = useMutation<ApiResponse, Error, FechasRango>({
    mutationFn: () => obtenerVentasHora(fechas),
    onMutate: () => {
      setStatus('pending');
    },
    onError: (error) => {
      console.error('Error al obtener los datos:', error);
      setStatus('error');
    },
    onSuccess: (data) => {
      if (data.data.length === 0) {
        showAlert({
          text: 'El rango de fecha seleccionado no contiene información',
          icon: 'error',
          cancelButtonText: 'Cerrar',
          showCancelButton: true,
          timer: 2200,
        });
      }
      setVentasPorHora(data.data);
      setStatus('success');
    },
    onSettled: () => {
      setStatus('idle');
    },
  });

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && ventasPorHora) {
        handleClearData();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);

    if (ventasPorHora?.length) {
      setSucursalesDisponibles(ventasPorHora.map((sucursal) => sucursal.nsucursal));
      setIsProcessing(true);
      // setFooter(true);
      if (sucursalesSeleccionadas.length === 0 && ventasPorHora.length) {
        setSucursalesSeleccionadas(ventasPorHora.map((sucursal) => sucursal.nsucursal));
      }
    }

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [ventasPorHora]);

  console.log(footer);

  // SACAR FOOTER SI NO HAY DATOS SELECCIONADOS PARA MOSTRARSE
  useEffect(() => {
    if (!ventasPorHora?.length && !sucursalesSeleccionadas?.length) {
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
  // useEffect(() => {
  //   const handleEscapeKey = (e: KeyboardEvent) => {
  //     if (e.key === 'Escape' && ventasPorHora) {
  //       handleClearData();
  //     }
  //   };

  //   // Escuchar el evento de la tecla Escape
  //   window.addEventListener('keydown', handleEscapeKey);

  //   // Limpiar el event listener cuando el componente se desmonte
  //   return () => {
  //     window.removeEventListener('keydown', handleEscapeKey);
  //   };
  // }, [ventasPorHora]);

  // FUNCION PARA AGRUPAR SEGUN EL RANGO DE HORARIOS
  const agruparPorHorario = (data: Sucursal[] | null, sucursalesSeleccionadas: string[] | null) => {
    const resultado: Record<string, { importe: string; cantidad: number; pares: number }> = {};

    let totalImporte = 0;
    let totalOperaciones = 0;
    let totalPares = 0;

    if (!sucursalesSeleccionadas) {
      return {
        datosAgrupados: resultado,
        totalImporte, // Número sin formatear
        totalOperaciones, // Número sin formatear
        totalPares, // Número sin formatear
      };
    }

    data
      ?.filter((sucursal) => sucursalesSeleccionadas.includes(sucursal.nsucursal))
      .forEach((sucursal) => {
        sucursal.info.forEach((intervalo) => {
          const horario = intervalo.horaini;

          if (!resultado[horario]) {
            resultado[horario] = { importe: '0', cantidad: 0, pares: 0 };
          }

          // Convertimos el importe a número, sumamos y luego redondeamos a 2 decimales
          const importeNumerico = parseFloat(intervalo.importe.replace(/\./g, '')) || 0;
          totalImporte = parseFloat((totalImporte + importeNumerico).toFixed(2)); // Aseguramos 2 decimales

          // Actualizamos el importe en el resultado
          const nuevoImporte =
            parseFloat(resultado[horario].importe.replace(/\./g, '')) + importeNumerico;
          resultado[horario].importe = nuevoImporte.toString(); // Guardamos como string

          // Sumamos otros valores
          resultado[horario].cantidad += intervalo.cantidad;
          resultado[horario].pares += intervalo.pares || 0;

          // Sumamos a los totales globales
          totalOperaciones += intervalo.cantidad;
          totalPares += intervalo.pares || 0;
        });
      });

    // Formateamos los importes en el resultado
    for (const horario in resultado) {
      resultado[horario].importe = formatearNumero(parseFloat(resultado[horario].importe));
    }

    return {
      datosAgrupados: resultado,
      totalImporte, // Número con 2 decimales
      totalOperaciones, // Número entero
      totalPares, // Número entero
    };
  };
  // FUNCION PARA ORDENAR LOS DATOS SEGUN LA ESTRUCTURA PARA LA TABLA
  const crearDataParaTabla = ({
    datosAgrupados,
    totalImporte,
    totalOperaciones,
    totalPares,
  }: { datosAgrupados: DatosAgrupados } & Totales) => {
    const entries = Object.entries(datosAgrupados).sort((a, b) => a[0].localeCompare(b[0]));

    return entries.map(([horario, datos], index) => {
      const importeNumerico = parseFloat(datos.importe.replace(/\./g, ''));

      return {
        id: index + 1,
        hora: horario,
        nOperaciones: datos.cantidad,
        porcentajeOperaciones:
          totalOperaciones > 0 ? ((datos.cantidad / totalOperaciones) * 100).toFixed(2) : 0,
        importe: datos.importe,
        porcentajeImporte:
          totalImporte > 0 ? ((importeNumerico / totalImporte) * 100).toFixed(2) : 0,
        pares: datos.pares,
        porcentajePares: totalPares > 0 ? ((datos.pares / totalPares) * 100).toFixed(2) : 0,
      };
    });
  };

  // IMPLEMENTACION DE FUNCIONES
  const { datosAgrupados, totalImporte, totalOperaciones, totalPares } = agruparPorHorario(
    ventasPorHora,
    sucursalesSeleccionadas
  );

  const dataParaTabla = crearDataParaTabla({
    datosAgrupados,
    totalImporte,
    totalOperaciones,
    totalPares,
  });

  const findMaxValueAndHourByKey = (
    array: VentaPorHora[],
    key: keyof VentaPorHora
  ): { maxValue: number; hora: string | null } => {
    let maxValue = -Infinity;
    let hora = '';

    array.forEach((currentItem) => {
      const currentValue =
        typeof currentItem[key] === 'string'
          ? parseFloat(currentItem[key].replace(/\./g, ''))
          : currentItem[key];

      if (currentValue > maxValue) {
        maxValue = currentValue;
        hora = currentItem.hora; // Guardamos la hora correspondiente al valor máximo
      }
    });

    return { maxValue, hora };
  };
  const maxImporteValor = findMaxValueAndHourByKey(dataParaTabla, 'importe');
  const maxImporteFormateado = formatearNumero(maxImporteValor.maxValue);

  // formateo con miles y centavos
  const totalImporteFormateado = formatearNumero(totalImporte);
  // FOOTER TABLA 1
  const datosParaFooter = {
    id: '',
    hora: '',
    totalOperaciones: totalOperaciones,
    porcentajeOperaciones: '',
    totalPares: totalPares,
    porcentajePares: '',
    totalImporte: totalImporteFormateado,
    porcentajeImporte: '',
  };

  const handleFetchData = async () => {
    try {
      if (!fechas.from || !fechas.to) {
        console.log(fechas, 'fechas');
        console.log('Rango de fechas inválido');
        return;
      }
      mutate(fechas);
    } catch (error) {
      console.error('Error en la petición:', error);
      alert('Error al obtener los datos');
      setFoco(true);
    }
  };

  const handleClearData = () => {
    setIsProcessing(false);
    setFooter(false);
    clearVentasPorHora();
    clearSucursalesDisponibles();
    clearSucursalesSeleccionadas();
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
            onFetchData={handleFetchData}
            onClearData={handleClearData}
            isProcessing={isProcessing}
            buttonText={{ fetch: 'Procesar', clear: 'Borrar' }}
            whitButttons={true}
          />
        </div>

        {/**modales y funcionabilidades */}
        <div className="col-span-5 col-start-8 2xl:col-span-4 2xl:col-start-8  ">
          <HerramientasComponent
            data={dataParaTabla}
            datosParaFooter={datosParaFooter}
            isProcessing={isProcessing}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 grid-rows-12  gap-2 py-5 pl-4">
        {isProcessing && (
          <div
            className=" col-span-1 col-start-8 row-span-1 relative left-6
           bg-white rounded-lg p-4  h-fit w-44 font-semibold text-base shadow-md 
          2xl:right-0 2xl:col-start-2 2xl:-left-12  "
          >
            <h3 className="font-bold text-xs 2xl:text-sm text-green-700 mb-2">Sucursales:</h3>
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
        <div
          className={`col-start-1 col-span-7 row-span-9 row-start-1   
          2xl:col-start-3 h-fit `}
        >
          <TablaVentaPorHora
            isProcessing={isProcessing}
            // status={status || 'idle'}
            datos={dataParaTabla}
            datosFooter={datosParaFooter}
            footer={footer}
          />
        </div>

        {isProcessing && (
          <div
            className=" flex flex-col gap-3 relative left-6 
           col-start-8 col-span-6 row-span-4  2xl:row-start-1
            h-fit w-fit "
          >
            <div className="  bg-white rounded-lg py-2 px-3 w-[29rem]  h-fit flex flex-col gap-1 ">
              <p className="text-blue-500">
                El mayor importe de venta es:{' '}
                <span className="text-xl text-green-600 font-bold"> ${maxImporteFormateado}</span>{' '}
              </p>
              <p className="text-blue-500">
                En el horario de <span className="font-bold">{maxImporteValor.hora}</span>{' '}
              </p>
            </div>
            <GraficoInforme datosParaGraficos={dataParaTabla} />
          </div>
        )}
      </div>
    </div>
  );
}
