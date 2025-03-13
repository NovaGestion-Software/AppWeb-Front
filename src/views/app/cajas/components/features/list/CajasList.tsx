import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import CardSucursales from './CardSucursales';
import SkListComponent from './SkListComponent';
import { Dispatch, useEffect } from 'react';
import { DatCaja, Importes, SucursalCaja } from '@/types';
import ViewTitle from '@/Components/ui/Labels/ViewTitle';

type CajasListProps = {
  handleRefetch: boolean;
  setHandleRefetch: Dispatch<React.SetStateAction<boolean>>;
  cajas: SucursalCaja[];
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<SucursalCaja[], Error>>;
  isFetching: boolean;
};

export default function CajasList({
  handleRefetch,
  setHandleRefetch,
  cajas,
  refetch,
  isFetching,
}: CajasListProps) {
  useEffect(() => {
    if (handleRefetch) {
      refetch();
      setHandleRefetch(false);
    }
  }, [handleRefetch, refetch]);

  const calcularEfectivoTotal = (caja: DatCaja) => {
    const efectivoVentas = parseFloat(caja.ventas?.importe01 || '0');
    const efectivoCobranza = parseFloat(caja.cobranza?.importe01 || '0');
    const efectivoPlanPago = parseFloat(caja.planpago?.importe01 || '0');

    // Sumar los importes de ventas, cobranza y plan de pago
    const efectivo = efectivoCobranza + efectivoPlanPago + efectivoVentas;

    return efectivo;
    // .toLocaleString(undefined, {
    //   maximumFractionDigits: 0,
    // });
  };

  const calcularTotal = (caja: DatCaja, tipo: keyof DatCaja) => {
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

    // Aseguramos que caja[tipo] es de tipo Importes, para evitar el error de tipo
    const importesCaja = caja[tipo] as Importes;

    // Sumamos los importes del tipo seleccionado (ventas, cobranza, o planpago)
    const total = importes.reduce(
      (sum, key) => sum + (parseFloat(importesCaja[key as keyof Importes]) || 0),
      0
    );

    return total.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });
  };

  const calcularDisponibilidad = (caja: DatCaja) => {
    const efectivo = calcularEfectivoTotal(caja);
    const ingresos = parseFloat(caja.ingresos || '0');
    const gastos = parseFloat(caja.gastos || '0');
    const retiros = parseFloat(caja.retiro || '0');

    const totalCajaActual = efectivo + ingresos - gastos - retiros;

    return totalCajaActual.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });
  };
  const calcularEfectivo = (caja: DatCaja) => {
    const efectivo = calcularEfectivoTotal(caja); // Retorna un valor numérico
    return efectivo.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });
  };
  const calcularTotalVentas = (caja: DatCaja) => calcularTotal(caja, 'ventas');
  const calcularTotalCobranza = (caja: DatCaja) => calcularTotal(caja, 'cobranza');
  const calcularTotalPlanP = (caja: DatCaja) => calcularTotal(caja, 'planpago');

  const formatearFecha = (fechaISO: string) => {
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
      {isFetching ? (
        <SkListComponent />
      ) : (
        <>
          <ViewTitle title="Detalle de Cajas" className="rounded-t-md" />
          <div className="flex flex-col gap-2 bg-white h-[40rem] shadow-md rounded-b-md ">
            <div className="flex flex-col gap-y-5 h-[52rem] scrollbar-thin overflow-auto p-4">
              {cajas
                .slice() // Creamos una copia para evitar mutar el estado original
                .sort((a: any, b: any) => a.sucursal - b.sucursal) // Ordena según el número de sucursal
                .map((sucursal) =>
                  sucursal.datcaja.map((caja: DatCaja) => (
                    <CardSucursales
                      estado={caja.fecha_c === null}
                      // key={`${sucursal.nsucursal}-${caja.ncaja}`} // Añadir una clave única para cada caja
                      nombre={sucursal.nsucursal}
                      sucursal={sucursal.sucursal}
                      numero={caja.ncaja}
                      apertura={formatearFecha(caja.fecha_a)} // Formatear la fecha de apertura
                      ultimaVenta={formatearFecha(caja.fecha_c || '')}
                      efectivo={calcularEfectivo(caja)}
                      ventas={calcularTotalVentas(caja)}
                      cobranza={calcularTotalCobranza(caja)}
                      planP={calcularTotalPlanP(caja)}
                      egresos={caja.retiro}
                      saldo={calcularDisponibilidad(caja)} // Llama a la función para cada caja
                    />
                  ))
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
