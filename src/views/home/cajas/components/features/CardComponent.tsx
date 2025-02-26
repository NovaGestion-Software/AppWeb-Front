import { Dispatch } from 'react';
import { useQuery } from '@tanstack/react-query';
import { obtenerCajasImportes } from '../../../../../services/AppService';
import SkeletonCajaComponent from './SkeletonCajaComponent';
import CardCaja from './CardCaja';
// import { TCaja } from "@/types/index";
// import { useSelector } from "react-redux";

type CardComponentProps = {
  handleRefetch: boolean;
  setHandleRefetch: Dispatch<React.SetStateAction<boolean>>;
};

export default function CardComponent({ handleRefetch, setHandleRefetch }: CardComponentProps) {
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
  //  console.log(cajas)

  /** Notas
 * 
 Importes:
  01 - Efectivo
  02 - cheques
  03 - transferencia
  04 - créditos
  06 - financieras
  07 - tarjetaCredito
  08 - TarjetaDebito
  09 - mutuales
  10 - cuentaCorriente
  11 - billeteras
 * 
 * 
 */
  // Función para calcular el total de un importe dado (ventas, cobranza, planpago)
  const calcularTotalPorImporte = (cajas: any, importeKey: any) => {
    let keyEncontrada = false;
    const estructurasNoEncontradas = new Set();

    const total = cajas?.reduce((total: any, sucursal: any) => {
      return (
        total +
        sucursal.datcaja.reduce((cajaTotal: any, caja: any) => {
          // Verificamos si la clave existe en ventas, cobranza o planpago
          const ventasImporte = parseFloat(caja.ventas[importeKey]) || 0;
          const cobranzaImporte = parseFloat(caja.cobranza[importeKey]) || 0;
          const planPagoImporte = parseFloat(caja.planpago[importeKey]) || 0;

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

    if (!keyEncontrada) {
      console.warn(
        `La clave "${importeKey}" no fue encontrada en las siguientes estructuras: ${[
          ...estructurasNoEncontradas,
        ].join(', ')}`
      );
      return undefined; // Devolver undefined si no se encuentra la clave
    }

    return total.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  // Función para calcular el total de un importe dado (ventas, cobranza, planpago)
  const calcularTotalMovCaja = (cajas: any, movKey: any) => {
    return cajas
      ?.reduce((total: any, sucursal: any) => {
        return (
          total +
          sucursal.datcaja.reduce((cajaTotal: any, caja: any) => {
            // Sumamos el importe de ventas, cobranza y planpago
            const movImporte = parseFloat(caja[movKey]) || 0;

            console.log(movKey, movImporte);
            return cajaTotal + movImporte;
          }, 0)
        );
      }, 0)
      .toLocaleString(undefined, { maximumFractionDigits: 0 });
  };
  // Función para calcular la disponibilidad del total en todas las cajas
  const calcularTotalDisp = (cajas: any) => {
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
  //Total sucursales
  const totalSucursales = cajas?.length;

  // total de Cajas.
  const totalDatCajaItems = cajas?.reduce((acc: any, sucursal: any) => {
    return acc + sucursal.datcaja.length; // Sumamos el número de objetos en datcaja de cada sucursal
  }, 0);

  //Total ventas:
  const totalVentas = cajas
    ?.reduce((total: any, sucursal: any) => {
      // Accedemos a datcaja de cada sucursal
      return (
        total +
        sucursal.datcaja.reduce((cajaTotal: any, caja: any) => {
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
            cajaTotal + importes.reduce((sum, key) => sum + (parseFloat(caja.ventas[key]) || 0), 0)
          );
        }, 0)
      );
    }, 0)
    .toLocaleString(undefined, { maximumFractionDigits: 0 });

  //Total Cobranzas Creditos:
  const totalCobranzasCredito = cajas
    ?.reduce((total: any, sucursal: any) => {
      // Accedemos a datcaja de cada sucursal
      return (
        total +
        sucursal.datcaja.reduce((cajaTotal: any, caja: any) => {
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
            importes.reduce((sum, key) => sum + (parseFloat(caja.cobranza[key]) || 0), 0)
          );
        }, 0)
      );
    }, 0)
    .toLocaleString(undefined, { maximumFractionDigits: 0 });

  //Total Cobranzas Creditos:
  const totalCobranzasPP = cajas
    ?.reduce((total: any, sucursal: any) => {
      // Accedemos a datcaja de cada sucursal
      return (
        total +
        sucursal.datcaja.reduce((cajaTotal: any, caja: any) => {
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
            importes.reduce((sum, key) => sum + (parseFloat(caja.planpago[key]) || 0), 0)
          );
        }, 0)
      );
    }, 0)
    .toLocaleString(undefined, { maximumFractionDigits: 0 });

  // Sacar totales de tarjetas
  const efectivo = calcularTotalPorImporte(cajas, 'importe01');
  const cheques = calcularTotalPorImporte(cajas, 'importe02');
  const transferencia = calcularTotalPorImporte(cajas, 'importe03');
  const creditosSF = calcularTotalPorImporte(cajas, 'importe04');
  const financieras = calcularTotalPorImporte(cajas, 'importe06');
  const tarjetaCredito = calcularTotalPorImporte(cajas, 'importe07');
  const tarjetaDebito = calcularTotalPorImporte(cajas, 'importe08');
  const mutuales = calcularTotalPorImporte(cajas, 'importe09');
  const cuentaCorriente = calcularTotalPorImporte(cajas, 'importe10');
  const billeteras = calcularTotalPorImporte(cajas, 'importe11');
  // la pregunta aca seria como diferenciar las ventas de gift cards y las compras hechas con gift cards
  const vales = calcularTotalPorImporte(cajas, 'importeva');
  const giftCard = calcularTotalPorImporte(cajas, 'importegif');
  const ordenCompra = calcularTotalPorImporte(cajas, 'importecom');

  const totalIngresos = calcularTotalMovCaja(cajas, 'ingresos');
  const totalGastos = calcularTotalMovCaja(cajas, 'gastos');
  const totalRetiros = calcularTotalMovCaja(cajas, 'retiros');
  const disponibilidades = calcularTotalDisp(cajas);

  // console.log("Total Disponibilidades:", disponibilidades);

  /** prototipos de funciones
 * 
 *  Total de Efectivo (importe01 de ventas, cobranza y planpago)
  const efectivo = cajas
    ?.reduce((total, sucursal) => {
      // Recorremos cada caja dentro de datcaja
      return (
        total +
        sucursal.datcaja.reduce((cajaTotal, caja) => {
          // Sumamos 'importe01' de ventas, cobranza y planpago
          const ventasImporte = parseFloat(caja.ventas.importe01) || 0;
          const cobranzaImporte = parseFloat(caja.cobranza.importe01) || 0;
          const planPagoImporte = parseFloat(caja.planpago.importe01) || 0;

          // Sumamos todos los valores
          return cajaTotal + ventasImporte + cobranzaImporte + planPagoImporte;
        }, 0)
      );
    }, 0)
    .toLocaleString(undefined, { maximumFractionDigits: 0 });


    const sucursales = {};
  cajas?.forEach((caja) => {
    const nombre = caja.nombre;
    if (nombre in sucursales) {
      sucursales[nombre] += 1;
    } else {
      sucursales[nombre] = 1;
    }
  });

  const creditos = cajas
    ?.reduce((total, item) => total + (parseFloat(item.importe04) || 0), 0)
    .toLocaleString(undefined, { maximumFractionDigits: 0 });

  const financieras = cajas
    ?.reduce((total, item) => total + (parseFloat(item.importe06) || 0), 0)
    .toLocaleString(undefined, { maximumFractionDigits: 0 });

  const tarjetaCredito = cajas
    ?.reduce((total, item) => total + (parseFloat(item.importe07) || 0), 0)
    .toLocaleString(undefined, { maximumFractionDigits: 0 });

  const tarjetaDebito = cajas
    ?.reduce((total, item) => total + (parseFloat(item.importe08) || 0), 0)
    .toLocaleString(undefined, { maximumFractionDigits: 0 });

  const mutuales = cajas
    ?.reduce((total, item) => total + (parseFloat(item.importe09) || 0), 0)
    .toLocaleString(undefined, { maximumFractionDigits: 0 });

  const cuentaCorriente = cajas
    ?.reduce((total, item) => total + (parseFloat(item.importe10) || 0), 0)
    .toLocaleString(undefined, { maximumFractionDigits: 0 });

  const billeteras = cajas
    ?.reduce((total, item) => total + (parseFloat(item.importe11) || 0), 0)
    .toLocaleString(undefined, { maximumFractionDigits: 0 });

  // const cheque = cajas.reduce((total, item) =>
 */
  //     total + (parseFloat(item.importe11) || 0), 0 // VERIFICAR QUE TIPO DE IMPORTE ES
  //   ).toLocaleString(undefined, { maximumFractionDigits: 0 });

  const cards = [
    {
      title: totalSucursales,
      subtitle: 'Sucursales',
      bg: 'bg-gradient-to-b from-blue-500 to-blue-900',
    },
    {
      title: totalDatCajaItems,
      subtitle: 'Cajas',
      bg: 'bg-gradient-to-b from-gray-600 to-gray-900',
    },
    {
      title: `$ ${totalVentas}`,
      subtitle: 'Total Ventas',
      bg: 'bg-gradient-to-b from-orange-500 to-orange-900',
    },
    {
      title: `$ ${totalCobranzasCredito} `,
      subtitle: 'Cobranzas Credito',
      bg: 'bg-gradient-to-b from-fuchsia-500 to-fuchsia-900',
    },
    {
      title: `$ ${totalCobranzasPP} `,
      subtitle: 'Cobranzas Plan de Pago',
      bg: 'bg-gradient-to-b from-fuchsia-500 to-fuchsia-700',
    },
    //
    {
      title: `$ ${giftCard}`,
      subtitle: 'Gift Card vendidas.',
      bg: 'bg-gradient-to-b from-fuchsia-500 to-fuchsia-700',
    },
    {
      title: `$ ${efectivo}`,
      subtitle: 'Efectivo',
      bg: 'bg-gradient-to-b from-teal-600 to-teal-900',
    },
    {
      title: `$ ${billeteras}`,
      subtitle: 'Billeteras',
      bg: 'bg-gradient-to-b from-indigo-600 to-indigo-900',
    },
    {
      title: `$ ${transferencia}`,
      subtitle: 'Transferencias',
      bg: 'bg-gradient-to-b from-rose-600 to-rose-900',
    },
    {
      title: `$ ${tarjetaDebito}`,
      subtitle: 'Tarjeta Débito',
      bg: 'bg-gradient-to-b from-green-600 to-green-900',
    },
    {
      title: `$ ${tarjetaCredito}`,
      subtitle: 'Tarjeta Crédito',
      bg: 'bg-gradient-to-b from-yellow-600 to-yellow-900',
    },

    {
      title: `$ ${financieras}`,
      subtitle: 'Financiera',
      bg: 'bg-gradient-to-b from-purple-600 to-purple-900',
    },
    {
      title: `$ ${creditosSF}`,
      subtitle: 'Créditos',
      bg: 'bg-gradient-to-b from-pink-600 to-pink-900',
    },
    {
      title: `$ ${cuentaCorriente}`,
      subtitle: 'Cuenta Corriente',
      bg: 'bg-gradient-to-b from-cyan-600 to-cyan-900',
    },
    {
      title: `$ ${mutuales}`,
      subtitle: 'Mutuales',
      bg: 'bg-gradient-to-b from-lime-600 to-lime-900',
    },

    {
      title: `$ ${cheques}`,
      subtitle: 'Cheque',
      bg: 'bg-gradient-to-b from-amber-500 to-amber-900',
    },
    {
      title: `$ ${ordenCompra}`,
      subtitle: 'Orden de compra',
      bg: 'bg-gradient-to-b from-amber-500 to-amber-900',
    },

    {
      title: `$ ${vales}`,
      subtitle: 'Vale',
      bg: 'bg-gradient-to-b from-amber-500 to-amber-900',
    },

    {
      title: `$ ${giftCard}`,
      subtitle: 'Gift Card',
      bg: 'bg-gradient-to-b from-amber-500 to-amber-900',
    },
    {
      title: `$ ${totalIngresos} `,
      subtitle: 'Ingreso',
      bg: 'bg-gradient-to-b from-red-500 to-red-900',
    },
    {
      title: `$ ${totalGastos} `,
      subtitle: 'Gastos',
      bg: 'bg-gradient-to-b from-red-500 to-red-900',
    },
    {
      title: `$ ${totalRetiros} `,
      subtitle: 'Retiro',
      bg: 'bg-gradient-to-b from-gray-500 to-gray-900',
    },
    {
      title: `$ ${disponibilidades}`,
      subtitle: 'Disponibilidades',
      bg: 'bg-gradient-to-b from-green-600 to-green-900',
    },
  ];

  if (handleRefetch) {
    refetch();
    setHandleRefetch(false);
  }
  return (
    <>
      {isLoading || isFetching || !cajas?.length ? (
        <SkeletonCajaComponent />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row flex-wrap gap-2 w-full mb-8">
            {cards
              .slice(0, 6)
              .filter((card) => card.title && card.title !== '$ undefined')
              .map((card, id) => (
                <CardCaja key={id} {...card} />
              ))}
          </div>
          <div
            className="flex flex-row flex-wrap gap-2 mb-3
        w-full h-full "
          >
            {cards
              .slice(6, 19)
              .filter((card) => card.title && card.title !== '$ undefined')
              .map((card, id) => (
                <CardCaja key={id} {...card} />
              ))}
          </div>
          <div className="flex flex-row flex-wrap gap-2 ">
            {cards
              .slice(19)
              .filter((card) => card.title && card.title !== '$ undefined')
              .map((card, id) => (
                <CardCaja key={id} {...card} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}
