import { useQuery } from '@tanstack/react-query';
import SkeletonCardSucursales from './SkeletonCardsSucursales';
import { obtenerCajasImportes } from '../../../../../services/AppService';
import CardSucursales from './CardSucursales';
// import SkeletonCajaComponent from "./SkeletonCajaComponent";

function CajasList() {
  const {
    data: cajas,
    error,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['cajas'],
    queryFn: obtenerCajasImportes,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // Datos frescos por 5 minutos
  });

  const calcularDisponibilidadPorCaja = (caja: any) => {
    const efectivoVentas = parseFloat(caja.ventas?.importe01 || 0); // Importe efectivo de ventas
    const efectivoCobranza = parseFloat(caja.cobranza?.importe01 || 0); // Importe efectivo de cobranza
    const efectivoPlanPago = parseFloat(caja.planpago?.importe01 || 0); // Importe efectivo de plan de pago
    const efectivo = efectivoCobranza + efectivoPlanPago + efectivoVentas;
    const ingresos = parseFloat(caja.ingresos || 0); // Ingresos totales
    const gastos = parseFloat(caja.gastos || 0); // Gastos totales
    const retiros = parseFloat(caja.retiro || 0); // Retiros totales

    // Calcula el total por caja: efectivo + ingresos - gastos - retiros
    const totalCajaActual = efectivo + ingresos - gastos - retiros;

    return totalCajaActual.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });
  };

  const calcularEfectivo = (caja: any) => {
    const efectivoVentas = parseFloat(caja.ventas?.importe01 || 0); // Importe efectivo de ventas
    const efectivoCobranza = parseFloat(caja.cobranza?.importe01 || 0); // Importe efectivo de cobranza
    const efectivoPlanPago = parseFloat(caja.planpago?.importe01 || 0); // Importe efectivo de plan de pago
    const efectivo = efectivoCobranza + efectivoPlanPago + efectivoVentas;

    return efectivo.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });
  };
  const calcularTotalVentasPorCaja = (caja: any) => {
    const importes = [
      'importe01',
      'importe02',
      'importe03',
      'importe04',
      'importe06',
      'importe07',
      'importe08',
      'importe09',
      'importe10',
      'importe11',
      'importeva',
    ];

    // Sumamos los importes de ventas de cada caja
    const totalVentasCaja = importes.reduce(
      (sum, key) => sum + (parseFloat(caja.ventas[key]) || 0),
      0
    );

    return totalVentasCaja.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });
  };
  const calcularTotalCobranzaPorCaja = (caja: any) => {
    const importes = [
      'importe01',
      'importe02',
      'importe03',
      'importe04',
      'importe06',
      'importe07',
      'importe08',
      'importe09',
      'importe10',
      'importe11',
      'importeva',
    ];

    // Sumamos los importes de cobranza de cada caja
    const totalCobranzasCaja = importes.reduce(
      (sum, key) => sum + (parseFloat(caja.cobranza[key]) || 0),
      0
    );

    return totalCobranzasCaja.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });
  };
  const calcularTotalPlanPPorCaja = (caja: any) => {
    const importes = [
      'importe01',
      'importe02',
      'importe03',
      'importe04',
      'importe06',
      'importe07',
      'importe08',
      'importe09',
      'importe10',
      'importe11',
      'importeva',
    ];

    // Sumamos los importes de planpago de cada caja
    const totalPlanPCaja = importes.reduce(
      (sum, key) => sum + (parseFloat(caja.planpago[key]) || 0),
      0
    );

    return totalPlanPCaja.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });
  };

  const formatearFecha = (fechaISO: any) => {
    if (!fechaISO) return '';

    // Crear un objeto Date desde la cadena ISO
    const fecha = new Date(fechaISO);

    // Extraer los componentes de la fecha
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son base 0
    const dia = String(fecha.getDate()).padStart(2, '0');
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');

    // Devolver el formato deseado: YYYY-MM-DD HH:mm
    return `${año}-${mes}-${dia} ${horas}:${minutos}`;
  };

  return (
    <div className="w-1/2 p-5 pb-1">
      {isLoading || isFetching || !cajas?.length ? (
        <SkeletonCardSucursales />
      ) : (
        <div className="flex flex-col gap-2 bg-white h-[52rem]  shadow-md rounded-md p-5 ">
          <h3 className="text-3xl pt-4 px-4 font-bold">Detalle de Cajas</h3>
          <div className="flex flex-col gap-y-5 h-[52rem] scrollbar-thin overflow-auto p-4">
            {cajas
              .slice() // Creamos una copia para evitar mutar el estado original
              .sort((a: any, b: any) => a.sucursal - b.sucursal) // Ordena según el número de sucursal
              .map((sucursal: any) =>
                sucursal.datcaja.map((caja: any, index: any) => (
                  <CardSucursales
                    estado={caja.fecha_c === null}
                    key={`${sucursal.nsucursal}-${caja.ncaja}`} // Añadir una clave única para cada caja
                    nombre={sucursal.nsucursal}
                    sucursal={sucursal.sucursal}
                    numero={caja.ncaja}
                    apertura={formatearFecha(caja.fecha_a)} // Formatear la fecha de apertura
                    ultimaVenta={formatearFecha(caja.fecha_c)}
                    efectivo={calcularEfectivo(caja)}
                    ventas={calcularTotalVentasPorCaja(caja)}
                    cobranza={calcularTotalCobranzaPorCaja(caja)}
                    planP={calcularTotalPlanPPorCaja(caja)}
                    egresos={caja.retiro}
                    saldo={calcularDisponibilidadPorCaja(caja)} // Llama a la función para cada caja
                  />
                ))
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CajasList;
