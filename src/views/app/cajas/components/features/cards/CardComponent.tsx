import { Dispatch, useEffect } from 'react';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { Importes, SucursalCaja } from '@/types';
import CardCaja from './CardCaja';
import SkCajaComponent from './SkCajaComponent';

type Valores = {
  [key: string]: number | string | undefined | any;
};

type CardComponentProps = {
  handleRefetch: boolean;
  setHandleRefetch: Dispatch<React.SetStateAction<boolean>>;
  cajas: SucursalCaja[];
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<SucursalCaja[], Error>>;
  isFetching: boolean;
};

export default function CardComponent({
  handleRefetch,
  setHandleRefetch,
  cajas,
  refetch,
  isFetching,
}: CardComponentProps) {
  useEffect(() => {
    if (handleRefetch) {
      refetch();
      setHandleRefetch(false);
    }
  }, [handleRefetch, refetch]);

  //Total Sucursales
  const totalSucursales = cajas?.length;

  // Total Cajas
  const totalCajas = cajas?.reduce((acc, sucursal) => {
    return acc + sucursal.datcaja.length;
  }, 0);

  //Total Ventas
  const totalVentas = cajas
    ?.reduce((total, sucursal) => {
      return (
        total +
        sucursal.datcaja.reduce((cajaTotal, caja) => {
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
          return (
            cajaTotal +
            importes.reduce(
              (sum, key) => sum + (parseFloat(caja.ventas[key as keyof Importes]) || 0),
              0
            )
          );
        }, 0)
      );
    }, 0)
    .toLocaleString(undefined, { maximumFractionDigits: 0 });

  //Total Cobranzas Creditos
  const totalCobranzasCredito = cajas
    ?.reduce((total, sucursal) => {
      // Accedemos a datcaja de cada sucursal
      return (
        total +
        sucursal.datcaja.reduce((cajaTotal, caja) => {
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
          return (
            cajaTotal +
            importes.reduce(
              (sum, key) => sum + (parseFloat(caja.cobranza[key as keyof Importes]) || 0),
              0
            )
          );
        }, 0)
      );
    }, 0)
    .toLocaleString(undefined, { maximumFractionDigits: 0 });

  //Total Cobranzas PPago
  const totalCobranzasPP = cajas
    ?.reduce((total, sucursal) => {
      // Accedemos a datcaja de cada sucursal
      return (
        total +
        sucursal.datcaja.reduce((cajaTotal, caja) => {
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
          return (
            cajaTotal +
            importes.reduce(
              (sum, key) => sum + (parseFloat(caja.planpago[key as keyof Importes]) || 0),
              0
            )
          );
        }, 0)
      );
    }, 0)
    .toLocaleString(undefined, { maximumFractionDigits: 0 });

  // Función para calcular el total de un importe dado (ventas, cobranza, planpago)
  const calcularTotalImporte = (cajas: SucursalCaja[], importeKey: string): string | undefined => {
    let keyEncontrada = false;
    const estructurasNoEncontradas = new Set<string>();
    console.log(keyEncontrada);

    const total = cajas?.reduce((total, sucursal) => {
      return (
        total +
        sucursal.datcaja.reduce((cajaTotal, caja) => {
          // Verificamos si la clave existe en ventas, cobranza o planpago
          const ventasImporte = parseFloat(caja.ventas[importeKey as keyof Importes]) || 0;
          const cobranzaImporte = parseFloat(caja.cobranza[importeKey as keyof Importes]) || 0;
          const planPagoImporte = parseFloat(caja.planpago[importeKey as keyof Importes]) || 0;

          if (importeKey in caja.ventas) {
            keyEncontrada = true;
          } else {
            estructurasNoEncontradas.add('ventas');
          }

          if (importeKey in caja.cobranza) {
            keyEncontrada = true;
          } else {
            estructurasNoEncontradas.add('cobranza');
          }

          if (importeKey in caja.planpago) {
            keyEncontrada = true;
          } else {
            estructurasNoEncontradas.add('planpago');
          }

          // Sumamos todos los valores
          return cajaTotal + ventasImporte + cobranzaImporte + planPagoImporte;
        }, 0)
      );
    }, 0);

    // if (!keyEncontrada) {
    //   console.warn(
    //     `La clave "${importeKey}" no fue encontrada en las siguientes estructuras: ${[
    //       ...estructurasNoEncontradas,
    //     ].join(', ')}`
    //   );
    //   return undefined; // Devolver undefined si no se encuentra la clave
    // }

    return total.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  // Función para calcular el total de un importe dado (ventas, cobranza, planpago)
  const calcularTotalMovCaja = (cajas: SucursalCaja[], movKey: string): string => {
    return cajas
      ?.reduce((total: any, sucursal: any) => {
        return (
          total +
          sucursal.datcaja.reduce((cajaTotal: any, caja: any) => {
            // Sumamos el importe de ventas, cobranza y planpago
            const movImporte = parseFloat(caja[movKey]) || 0;

            // console.log(movKey, movImporte);
            return cajaTotal + movImporte;
          }, 0)
        );
      }, 0)
      .toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  // Función para calcular la disponibilidad del total en todas las cajas
  const calcularTotalDisp = (cajas: SucursalCaja[]) => {
    if (!cajas) return '0'; // Si no hay datos, retorna 0 como string formateado

    // Sumar efectivo, ingresos, restar gastos y retiros
    return cajas
      .reduce((totalSucursal: any, sucursal: any) => {
        const totalCajas = sucursal.datcaja.reduce((totalCaja: any, caja: any) => {
          const efectivoVentas = parseFloat(caja.ventas?.importe01 || 0); // Importe efectivo de ventas
          const efectivoCobranza = parseFloat(caja.cobranza?.importe01 || 0); // Importe efectivo de cobranza
          const efectivoPlanPago = parseFloat(caja.planpago?.importe01 || 0); // Importe efectivo de importe01
          const efectivo = efectivoCobranza + efectivoPlanPago + efectivoVentas;
          const ingresos = parseFloat(caja.ingresos || 0); // Ingresos totales
          const gastos = parseFloat(caja.gastos || 0); // Gastos totales
          const retiros = parseFloat(caja.retiro || 0); // Retiros totales

          // Calcula el total por caja: efectivo + ingresos - gastos - retiros
          const totalCajaActual = efectivo + ingresos - gastos - retiros;

          // Retorna la suma acumulada de la caja
          return totalCaja + totalCajaActual;
        }, 0);

        // Retorna la suma acumulada de todas las cajas de la sucursal
        return totalSucursal + totalCajas;
      }, 0)
      .toLocaleString(undefined, { maximumFractionDigits: 0 }); // Formateamos el total
  };

  // Sacar totales de tarjetas
  const efectivo = calcularTotalImporte(cajas || [], 'importe01');
  const cheques = calcularTotalImporte(cajas || [], 'importe02');
  const transferencia = calcularTotalImporte(cajas || [], 'importe03');
  const creditosSF = calcularTotalImporte(cajas || [], 'importe04');
  const financieras = calcularTotalImporte(cajas || [], 'importe06');
  const tarjetaCredito = calcularTotalImporte(cajas || [], 'importe07');
  const tarjetaDebito = calcularTotalImporte(cajas || [], 'importe08');
  const mutuales = calcularTotalImporte(cajas || [], 'importe09');
  const cuentaCorriente = calcularTotalImporte(cajas || [], 'importe10');
  const billeteras = calcularTotalImporte(cajas || [], 'importe11');
  // la pregunta aca seria como diferenciar las ventas de gift cards y las compras hechas con gift cards
  const vales = calcularTotalImporte(cajas || [], 'importeva');
  const giftCard = calcularTotalImporte(cajas || [], 'importegif');
  const ordenCompra = calcularTotalImporte(cajas || [], 'importecom');

  const totalIngresos = calcularTotalMovCaja(cajas || [], 'ingresos');
  const totalGastos = calcularTotalMovCaja(cajas || [], 'gastos');
  const totalRetiros = calcularTotalMovCaja(cajas || [], 'retiros');
  const disponibilidades = calcularTotalDisp(cajas || []);

  const valores: Valores = {
    totalSucursales,
    totalCajas,
    totalVentas,
    totalCobranzasCredito,
    totalCobranzasPP,
    giftCard,
    efectivo,
    billeteras,
    transferencia,
    tarjetaCredito,
    tarjetaDebito,
    financieras,
    creditosSF,
    cuentaCorriente,
    mutuales,
    cheques,
    ordenCompra,
    vales,
    totalIngresos,
    totalGastos,
    totalRetiros,
    disponibilidades,
  };

  const cardData = [
    {
      key: 'totalSucursales',
      label: 'Sucursales',
      bg: 'bg-gradient-to-b from-blue-500 to-blue-900',
    },
    { key: 'totalCajas', label: 'Cajas', bg: 'bg-gradient-to-b from-gray-600 to-gray-900' },
    {
      key: 'totalVentas',
      label: 'Total Ventas',
      bg: 'bg-gradient-to-b from-orange-500 to-orange-900',
    },
    {
      key: 'totalCobranzasCredito',
      label: 'Cobranzas Crédito',
      bg: 'bg-gradient-to-b from-fuchsia-500 to-fuchsia-900',
    },
    {
      key: 'totalCobranzasPP',
      label: 'Cobranzas Plan de Pago',
      bg: 'bg-gradient-to-b from-rose-500 to-rose-900',
    },
    {
      key: 'giftCard',
      label: 'Gift Card vendidas',
      bg: 'bg-gradient-to-b from-amber-500 to-amber-900',
    },
    { key: 'efectivo', label: 'Efectivo', bg: 'bg-gradient-to-b from-teal-600 to-teal-900' },
    {
      key: 'billeteras',
      label: 'Billeteras',
      bg: 'bg-gradient-to-b from-indigo-600 to-indigo-900',
    },
    {
      key: 'transferencia',
      label: 'Transferencias',
      bg: 'bg-gradient-to-b from-rose-600 to-rose-900',
    },
    {
      key: 'tarjetaDebito',
      label: 'Tarjeta Débito',
      bg: 'bg-gradient-to-b from-green-600 to-green-900',
    },
    {
      key: 'tarjetaCredito',
      label: 'Tarjeta Crédito',
      bg: 'bg-gradient-to-b from-yellow-600 to-yellow-900',
    },
    {
      key: 'financieras',
      label: 'Financiera',
      bg: 'bg-gradient-to-b from-purple-600 to-purple-900',
    },
    { key: 'creditosSF', label: 'Créditos', bg: 'bg-gradient-to-b from-pink-600 to-pink-900' },
    {
      key: 'cuentaCorriente',
      label: 'Cuenta Corriente',
      bg: 'bg-gradient-to-b from-cyan-600 to-cyan-900',
    },
    { key: 'mutuales', label: 'Mutuales', bg: 'bg-gradient-to-b from-lime-600 to-lime-900' },
    { key: 'cheques', label: 'Cheque', bg: 'bg-gradient-to-b from-indigo-500 to-indigo-900' },
    {
      key: 'ordenCompra',
      label: 'Orden de compra',
      bg: 'bg-gradient-to-b from-stone-500 to-stone-900',
    },
    { key: 'vales', label: 'Vale', bg: 'bg-gradient-to-b from-amber-500 to-amber-900' },
    { key: 'giftCard', label: 'Gift Card', bg: 'bg-gradient-to-b from-sky-500 to-sky-900' },
    { key: 'totalIngresos', label: 'Ingreso', bg: 'bg-gradient-to-b from-blue-500 to-blue-900' },
    { key: 'totalGastos', label: 'Gastos', bg: 'bg-gradient-to-b from-red-500 to-red-900' },
    { key: 'totalRetiros', label: 'Retiro', bg: 'bg-gradient-to-b from-gray-500 to-gray-900' },
    {
      key: 'disponibilidades',
      label: 'Disponibilidades',
      bg: 'bg-gradient-to-b from-green-600 to-green-900',
    },
  ];

  const cards = cardData.map(({ key, label, bg }) => ({
    title: key === 'totalSucursales' || key === 'totalCajas' ? valores[key] : `$ ${valores[key]}`,
    subtitle: label,
    bg,
  }));

  const renderCardSection = (start: number, end?: number) => (
    <div className="flex flex-row flex-wrap gap-2 mb-3 w-full h-full">
      {cards
        .slice(start, end)
        .filter((card) => card.title && card.title !== '$ undefined')
        .map((card, id) => (
          <CardCaja key={id} {...card} />
        ))}
    </div>
  );

  return (
    <>
      {isFetching ? (
        <SkCajaComponent />
      ) : (
        <div className="flex flex-col gap-4">
          {renderCardSection(0, 6)}
          {renderCardSection(6, 19)}
          {renderCardSection(19)}
        </div>
      )}
    </>
  );
}
