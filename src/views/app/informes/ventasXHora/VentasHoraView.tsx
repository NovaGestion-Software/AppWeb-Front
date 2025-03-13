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
  // const [sucursalesSeleccionadas, setSucursalesSeleccionadas] = useState<string[]>([]);
  // const [sucursalesDisponibles, setSucursalesDisponibles] = useState<string[]>([]);
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
      // console.log(data.data);
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
      // setSucursalesDisponibles(data.data.map((sucursal) => sucursal.nsucursal));
      // setSucursalesSeleccionadas(data.data.map((sucursal) => sucursal.nsucursal));
      // setIsProcessing(true);
      // setFooter(true);
      setStatus('success');
    },
    onSettled: () => {
      setStatus('idle');
    },
  });

  // SETEAR ESTADOS SI DATOS TIENE INFO.
  useEffect(() => {
    if (ventasPorHora?.length) {
      setSucursalesDisponibles(ventasPorHora.map((sucursal) => sucursal.nsucursal));
      setIsProcessing(true);
      setFooter(true);
      if (sucursalesSeleccionadas.length === 0) {
        setSucursalesSeleccionadas(ventasPorHora.map((sucursal) => sucursal.nsucursal));
      }
    }
  }, [ventasPorHora]);

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
      if (e.key === 'Escape' && ventasPorHora) {
        handleClearData();
      }
    };

    // Escuchar el evento de la tecla Escape
    window.addEventListener('keydown', handleEscapeKey);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [ventasPorHora]);

  // const agruparPorHorario = (data: Sucursal[] | null, sucursalesSeleccionadas: string[] | null) => {
  //   const resultado: Record<string, { importe: string; cantidad: number; pares: number }> = {};
  //   const horarios: Set<string> = new Set(); // Usamos un Set para evitar duplicados

  //   let totalImporte = 0;
  //   let totalOperaciones = 0;
  //   let totalPares = 0;

  //   if (!sucursalesSeleccionadas) {
  //     console.log('No se seleccionaron sucursales');
  //     return {
  //       datosAgrupados: resultado,
  //       totalImporte, // Número sin formatear
  //       totalOperaciones, // Número sin formatear
  //       totalPares, // Número sin formatear
  //     };
  //   }

  //   data
  //     ?.filter((sucursal) => sucursalesSeleccionadas.includes(sucursal.nsucursal))
  //     .forEach((sucursal) => {
  //       sucursal.info.forEach((intervalo) => {
  //         const horario = intervalo.horaini;

  //         // Guardamos los horarios en el objeto de horarios
  //         horarios[horario] = true;

  //         if (!resultado[horario]) {
  //           resultado[horario] = { importe: '0', cantidad: 0, pares: 0 };
  //         }

  //         // console.log(intervalo.importe);

  //         // Corrección: Convertimos el importe correctamente respetando los decimales
  //         const importeNumerico = parseFloat(intervalo.importe) || 0;
  //         // parseFloat(intervalo.importe.replace(/\./g, '').replace(',', '.')) || 0;

  //         // console.log(importeNumerico);

  //         // Sumar correctamente sin perder decimales
  //         totalImporte += importeNumerico;
  //         // Asegurar que totalImporte tenga solo dos decimales
  //         totalImporte = parseFloat(totalImporte.toFixed(2));
  //         // console.log(totalImporte);

  //         // Actualizamos el importe en el resultado sin perder precisión
  //         let importeActual =
  //           // parseFloat(resultado[horario].importe.replace(/\./g, '').replace(',', '.')) || 0;
  //           parseFloat(resultado[horario].importe) || 0;
  //         importeActual = parseFloat(importeActual.toFixed(2));
  //         // console.log(importeActual);
  //         let nuevoImporte = importeActual + importeNumerico;
  //         // console.log(nuevoImporte);
  //         // nuevoImporte = parseFloat(nuevoImporte.toFixed(2));
  //         resultado[horario].importe = nuevoImporte.toString(); // Guardamos como string sin formatear aún

  //         // Sumar otros valores
  //         resultado[horario].cantidad += intervalo.cantidad;
  //         resultado[horario].pares += intervalo.pares || 0;

  //         // Sumar a los totales globales
  //         totalOperaciones += intervalo.cantidad;
  //         totalPares += intervalo.pares || 0;
  //       });
  //     });

  //   // Después de la iteración, agregamos los horarios que no tengan datos a 'resultado'
  //   for (const horario in horarios) {
  //     if (!resultado[horario]) {
  //       resultado[horario] = { importe: '0', cantidad: 0, pares: 0 }; // Asignamos 0 si no existe el horario
  //     }
  //   }

  //   // **Formateamos los importes en el resultado antes de devolverlos**
  //   for (const horario in resultado) {
  //     resultado[horario].importe = formatearNumero(parseFloat(resultado[horario].importe));
  //     // console.log(resultado[horario].importe);
  //     // console.log(`Importe final formateado para ${horario}:`, resultado[horario].importe);
  //   }

  //   return {
  //     datosAgrupados: resultado,
  //     totalImporte, // Número con 2 decimales
  //     totalOperaciones, // Número entero
  //     totalPares, // Número entero
  //   };
  // };

  const obtenerHorarios = () => {
    // Crear un conjunto para almacenar horarios únicos
    const horarios = new Set<string>();

    // Iterar sobre ventasPorHora y obtener todos los horarios
    ventasPorHora?.forEach((sucursal) => {
      sucursal.info.forEach((intervalo) => {
        // Agregar cada horario al set, lo que asegura que sean únicos
        horarios.add(intervalo.horaini);
      });
    });

    // Convertir el Set a un array de horarios y ordenar de menor a mayor
    const horariosOrdenados = Array.from(horarios).sort();

    return horariosOrdenados;
  };

  // const horarios = obtenerHorarios();
  // console.log(horarios);

  const agruparPorHorario = (data: Sucursal[] | null, sucursalesSeleccionadas: string[] | null) => {
    const resultado: Record<string, { importe: string; cantidad: number; pares: number }> = {};

    const horarios = obtenerHorarios();

    let totalImporte = 0;
    let totalOperaciones = 0;
    let totalPares = 0;

    if (!sucursalesSeleccionadas || sucursalesSeleccionadas.length === 0) {
      // console.log('No se seleccionaron sucursales');
      return {
        datosAgrupados: resultado,
        totalImporte, // Número sin formatear
        totalOperaciones, // Número sin formatear
        totalPares, // Número sin formatear
      };
    }

    // 2️⃣ Inicializamos el resultado con todos los horarios posibles, incluso vacíos
    horarios.forEach((horario) => {
      resultado[horario] = { importe: '0', cantidad: 0, pares: 0 }; // Aseguramos que todos los horarios tengan un valor inicial
    });

    // 3️⃣ Procesamos las sucursales seleccionadas y agrupamos por horario
    data
      ?.filter((sucursal) => sucursalesSeleccionadas.includes(sucursal.nsucursal))
      .forEach((sucursal) => {
        sucursal.info.forEach((intervalo) => {
          const horario = intervalo.horaini.trim(); // Aseguramos que el horario esté bien formateado

          // Solo actualizamos el horario si ya existe en el resultado
          if (resultado[horario]) {
            // Convertimos el importe correctamente respetando los decimales
            const importeNumerico = parseFloat(intervalo.importe) || 0;

            // Sumar correctamente sin perder decimales
            totalImporte += importeNumerico;
            totalImporte = parseFloat(totalImporte.toFixed(2));

            // Actualizamos el importe en el resultado sin perder precisión
            let importeActual = parseFloat(resultado[horario].importe) || 0;
            importeActual = parseFloat(importeActual.toFixed(2));
            let nuevoImporte = importeActual + importeNumerico;
            resultado[horario].importe = nuevoImporte.toString(); // Guardamos como string sin formatear aún

            // Sumar otros valores
            resultado[horario].cantidad += intervalo.cantidad;
            resultado[horario].pares += intervalo.pares || 0;

            // Sumar a los totales globales
            totalOperaciones += intervalo.cantidad;
            totalPares += intervalo.pares || 0;
          }
        });
      });

    // **Formateamos los importes en el resultado antes de devolverlos**
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

  const crearDataParaTabla = ({
    datosAgrupados,
    totalImporte,
    totalOperaciones,
    totalPares,
  }: { datosAgrupados: DatosAgrupados } & Totales) => {
    const entries = Object.entries(datosAgrupados).sort((a, b) => a[0].localeCompare(b[0]));
    // console.log(entries);
    return entries.map(([horario, datos], index) => {
      const importeNumerico = parseFloat(datos.importe.replace(/\./g, ''));

      // console.log(`Importe: ${importeNumerico}`)
      // console.log(horario);
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

  // console.log(datosAgrupados);
  const dataParaTabla = crearDataParaTabla({
    datosAgrupados,
    totalImporte,
    totalOperaciones,
    totalPares,
  });

  const findMaxValueAndHourByKey = (
    datos: VentaPorHora[],
    key: keyof VentaPorHora
  ): { maxValue: number; hora: string | null } => {
    let maxValue = -Infinity;
    let hora = '';

    datos.forEach((currentItem) => {
      const currentValue =
        typeof currentItem[key] === 'string'
          ? parseFloat(currentItem[key].replace(/\./g, '').replace(',', '.'))
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

  // HANDLE FETCH
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

  // CLEAR DATA
  const handleClearData = () => {
    setIsProcessing(false);
    setFooter(false);
    clearVentasPorHora();
    clearSucursalesDisponibles();
    clearSucursalesSeleccionadas();
    setFoco(true);
  };

  // console.log(dataParaTabla);

  return (
    <div className="h-screen ">
      <ViewTitle title={'Ventas por Hora'} />

      <div className="flex flex-col h-fit mx-4">
        {/** BOTONERA */}
        <div className="grid grid-cols-12 grid-rows-1 h-11 px-4 gap-4 mt-2 mb-1 rounded">
          {/**ingresar fechas y Botones de procesado */}
          <div className="col-start-1 col-span-6 2xl:col-span-4 2xl:col-start-3 ">
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
          <div className="col-span-4 col-start-8 2xl:col-span-3 2xl:col-start-8">
            <HerramientasComponent
              data={dataParaTabla}
              isProcessing={isProcessing}
              datosParaFooter={datosParaFooter}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2 ml-4 2xl:ml-0 2xl:mt-5 ">
          {isProcessing && (
            <div className="col-span-5 2xl:col-start-2 flex flex-col items-center justify-evenly 2xl:justify-evenly 2xl:items-center transition-all duration-500 ease-out">
              {/* Sucursales */}
              <div className="col-start-1 col-span-5 row-start-1 w-fit h-fit py-2 px-4 bg-white rounded-lg font-semibold shadow-md space-y-2">
                <ul
                  className={`grid gap-x-4 ${
                    sucursalesDisponibles.length > 3 ? 'grid-cols-3' : 'grid-cols-1' // Si hay más de 3 sucursales, divide en 3 columnas
                  } grid-rows-auto list-disc list-inside text-xs 2xl:text-base 2xl:p-2`}
                >
                  {sucursalesDisponibles.map((sucursal, index) => (
                    <li
                      key={index}
                      className={`${
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

              {/* Información de ventas */}
              <div className="flex flex-col w-fit 2xl:w-[25rem] 2xl:text-lg bg-white rounded-lg py-1 px-3">
                <div className="flex gap-4">
                  <p className="text-blue-500 font-semibold">Mayores Ventas: </p>
                  <span className="text-green-600 font-bold ">{maxImporteValor.hora}</span>
                </div>
                <div className="flex gap-5">
                  <p className="text-blue-500 font-semibold">Mayor Importe: </p>
                  <p className=" text-green-600 font-bold ">{'$' + maxImporteFormateado}</p>
                </div>
              </div>

              {/* Gráfico */}
              <div className="w-full">
                <GraficoInforme datosParaGraficos={dataParaTabla} />
              </div>
            </div>
          )}

          <div
            className={`flex h-fit w-fit ml-5 transition-all duration-500 ease-out ${
              isProcessing
                ? 'col-start-6 2xl:col-start-7 transform'
                : ' col-start-3 2xl:col-start-4 transform translate-x-0'
            }`}
          >
            <TablaVentaPorHora
              isProcessing={isProcessing}
              dataParaTabla={dataParaTabla}
              datosFooter={datosParaFooter}
              footer={footer}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
