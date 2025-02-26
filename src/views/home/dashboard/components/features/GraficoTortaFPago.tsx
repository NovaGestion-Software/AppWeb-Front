import { useQuery } from '@tanstack/react-query';
import { obtenerTortaCobranzasR } from '../../../../../services/AppService';
import DonutCard from './DonutCard';

export default function GraficoTortaFPago() {
  const {
    data: dataTorta,
    error,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['DataTorta'],
    queryFn: obtenerTortaCobranzasR,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // Datos frescos por 5 minutos
  });

  const formatearNumeroConPuntos = (numero: any) => {
    const sinCentavos = Math.round(numero); // Redondea y elimina los centavos
    return sinCentavos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Agrega puntos como separadores de miles
  };

  const formatearNumero = (numero: any) => {
    if (numero < 100000) {
      return formatearNumeroConPuntos(numero); // Formato sin centavos
    } else if (numero < 1000000) {
      return formatearNumeroConPuntos(numero); // Formato sin centavos
    } else {
      const millones = numero / 1000000;
      return (
        Math.floor(millones)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'M'
      ); // Formato en millones sin decimales
    }
  };

  const calcularTotalImportes = (data: any, tipoCobranza: any) => {
    const index = tipoCobranza === 'actual' ? 2 : 3;
    const key = tipoCobranza === 'actual' ? 'cobranzasAñoActual' : 'cobranzasAñoAnterior';
    const dato = data?.[index];
    const cobranzas = dato?.[key];

    const clavesImportes = [
      'importe01',
      'importe02',
      'importe03',
      'importe06',
      'importe07',
      'importe08',
      'importe09',
      'importe11',
    ];

    const total =
      cobranzas?.reduce((total: any, caja: any) => {
        return (
          total +
          clavesImportes.reduce((subtotal, clave) => {
            const importe = parseFloat(caja[clave]) || 0;
            return subtotal + importe;
          }, 0)
        );
      }, 0) || 0;

    return formatearNumero(total);
  };

  const totalActual = calcularTotalImportes(dataTorta, 'actual');
  const totalAnterior = calcularTotalImportes(dataTorta, 'anterior');

  const calcularImporteCobranza = (data: any, importeKey: any, tipoCobranza: any) => {
    // Determina el índice y la clave según el tipo de cobranza
    const index = tipoCobranza === 'actual' ? 2 : 3;
    const key = tipoCobranza === 'actual' ? 'cobranzasAñoActual' : 'cobranzasAñoAnterior';

    // Accede al objeto y al array de cobranzas
    const dato = data?.[index];
    const cobranzas = dato?.[key];

    // Calcula el total de importes
    const totalImporte =
      cobranzas?.reduce((cajatotal: any, caja: any) => {
        const ventasImporte = parseFloat(caja[importeKey]) || 0; // Renombrado a ventasImporte
        return cajatotal + ventasImporte;
      }, 0) || 0;

    // Elimina los centavos y devuelve el total como número
    return Math.floor(totalImporte); // Redondea hacia abajo para quitar centavos
  };

  const totalImporte01 = calcularImporteCobranza(dataTorta, 'importe01', 'actual');
  const totalImporte02 = calcularImporteCobranza(dataTorta, 'importe02', 'actual');
  const totalImporte03 = calcularImporteCobranza(dataTorta, 'importe03', 'actual');
  const totalImporte06 = calcularImporteCobranza(dataTorta, 'importe06', 'actual');
  const totalImporte07 = calcularImporteCobranza(dataTorta, 'importe07', 'actual');
  const totalImporte08 = calcularImporteCobranza(dataTorta, 'importe08', 'actual');
  const totalImporte09 = calcularImporteCobranza(dataTorta, 'importe09', 'actual');
  const totalImporte11 = calcularImporteCobranza(dataTorta, 'importe11', 'actual');

  const totalImporte01AñoAnterior = calcularImporteCobranza(dataTorta, 'importe01', 'anterior');
  const totalImporte02AñoAnterior = calcularImporteCobranza(dataTorta, 'importe02', 'anterior');
  const totalImporte03AñoAnterior = calcularImporteCobranza(dataTorta, 'importe03', 'anterior');
  const totalImporte06AñoAnterior = calcularImporteCobranza(dataTorta, 'importe06', 'anterior');
  const totalImporte07AñoAnterior = calcularImporteCobranza(dataTorta, 'importe07', 'anterior');
  const totalImporte08AñoAnterior = calcularImporteCobranza(dataTorta, 'importe08', 'anterior');
  const totalImporte09AñoAnterior = calcularImporteCobranza(dataTorta, 'importe09', 'anterior');
  const totalImporte11AñoAnterior = calcularImporteCobranza(dataTorta, 'importe11', 'anterior');

  /**
 * 
 *   console.log("Total Importe01 efectivo:", totalImporte01);
  console.log(
    "Total Importe01 efectivo año anterior:",
    totalImporte01AñoAnterior
  );console.log("Total Importe02 cheques:", totalImporte02);
console.log("Total Importe03 transferencias:", totalImporte03);
console.log("Total Importe06 financieras:", totalImporte06);
console.log("Total Importe07 credito:", totalImporte07);
console.log("Total Importe08 debito:", totalImporte08);
console.log("Total Importe09 mutuales:", totalImporte09); 
console.log("Total Importe11 billeteras:", totalImporte11);
 */

  const formatearFecha = (año: any) => {
    return `${año}`; // Devolver el formato deseado: YYYY-MM
  };

  const obtenerFecha = (usarAnioAnterior = false) => {
    const fechaActual = new Date(); // Obtener la fecha actual

    // Obtener el año y el mes según el parámetro
    const año = usarAnioAnterior ? fechaActual.getFullYear() - 1 : fechaActual.getFullYear();

    // Usar la función para formatear la fecha
    return formatearFecha(año);
  };

  // Ejemplo de uso
  const fechaActual = obtenerFecha(); // Obtiene el mes y año actuales
  const fechaAnioAnterior = obtenerFecha(true);

  const cardUno = {
    total: totalActual,
    periodo: 'Distribución según forma de pago:',
    data: [
      {
        name: 'Efectivo',
        valor: totalImporte01,
      },
      {
        name: 'Billeteras',
        valor: totalImporte11,
      },
      {
        name: 'Transferencias',
        valor: totalImporte03,
      },
      {
        name: 'Debito',
        valor: totalImporte08,
      },
      {
        name: 'Credito',
        valor: totalImporte07,
      },
      {
        name: 'Financieras',
        valor: totalImporte06,
      },
      {
        name: 'Cheques',
        valor: totalImporte02,
      },
      {
        name: 'Mutuales',
        valor: totalImporte09,
      },
    ],
    categoria: [
      'Efectivo',
      'Billeteras',
      'Transferencias',
      'Debito',
      'Credito',
      'Financieras',
      'Cheques',
      'Mutuales',
    ],
  };
  const cardDos = {
    total: totalAnterior,
    periodo: 'Distribución según forma de pago:',
    data: [
      {
        name: 'Efectivo',
        valor: totalImporte01AñoAnterior,
      },
      {
        name: 'Billeteras',
        valor: totalImporte11AñoAnterior,
      },
      {
        name: 'Transferencias',
        valor: totalImporte03AñoAnterior,
      },
      {
        name: 'Debito',
        valor: totalImporte08AñoAnterior,
      },
      {
        name: 'Credito',
        valor: totalImporte07AñoAnterior,
      },
      {
        name: 'Financieras',
        valor: totalImporte06AñoAnterior,
      },
      {
        name: 'Cheques',
        valor: totalImporte02AñoAnterior,
      },
      {
        name: 'Mutuales',
        valor: totalImporte09AñoAnterior,
      },
    ],
    categoria: [
      'Efectivo',
      'Billeteras',
      'Transferencias',
      'Debito',
      'Credito',
      'Financieras',
      'Cheques',
      'Mutuales',
    ],
  };

  return (
    <div
      className="flex flex-col w-full h-full rounded-lg 
    shadow-none transition-shadow duration-300  hover:shadow-lg hover:shadow-gray-400 bg-white p-12"
    >
      <div className="text flex flex-col gap-1 mb-5">
        <p className="text-2xl text-tremor-content-strong  font-semibold">Cobranza de Créditos</p>
        <p className="text-tremor-default text-tremor-content left-1 relative text">
          Distribución según Forma de Pago:
        </p>
      </div>

      <div className="flex flex-row gap-2 justify-around items-center w-full p-2 ">
        <DonutCard
          fecha={fechaActual}
          titulo="Año"
          total={`$ ${totalActual}`}
          data={cardUno.data}
          categories={cardUno.categoria}
          loading={isLoading}
        />
        <DonutCard
          fecha={fechaAnioAnterior}
          titulo="Año"
          total={`$ ${totalAnterior}`}
          data={cardDos.data}
          categories={cardDos.categoria}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
