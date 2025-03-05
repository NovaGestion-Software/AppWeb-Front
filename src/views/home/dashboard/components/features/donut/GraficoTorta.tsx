import { Dispatch, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { obtenerTortaCobranzasR } from '@/services/AppService';
import DonutCard from './DonutCard';

interface GraficoTortaProps {
  handleRefetch: boolean;
  setHandleRefetch: Dispatch<React.SetStateAction<boolean>>;
}

export default function GraficoTorta({ handleRefetch, setHandleRefetch }: GraficoTortaProps) {
  const {
    data: dataTorta,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['dashboard-torta'],
    queryFn: obtenerTortaCobranzasR,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // Datos frescos por 5 minutos
  });

  useEffect(() => {
    if (handleRefetch) {
      refetch();
      setHandleRefetch(false);
    }
  }, [handleRefetch, refetch, setHandleRefetch]);

  const fechaActual = obtenerFecha();
  const fechaAnioAnterior = obtenerFecha(true);

  function obtenerFecha(usarAnioAnterior = false) {
    const fechaActual = new Date();
    const año = usarAnioAnterior ? fechaActual.getFullYear() - 1 : fechaActual.getFullYear();
    return `${año}`; // Devuelve solo el año (en el formato deseado)
  }

  function formatearNumero(numero: number) {
    if (numero < 1000000) {
      return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Formato con puntos para miles
    } else {
      const millones = numero / 1000000;
      return `${Math.floor(millones)}M`; // Formato en millones sin decimales
    }
  }

  function calcularImportes(data: any, tipoCobranza: string, obtenerTotal: boolean = true) {
    const index = tipoCobranza === 'actual' ? 2 : 3;
    const key = tipoCobranza === 'actual' ? 'cobranzasAñoActual' : 'cobranzasAñoAnterior';
    const cobranzas = data?.[index]?.[key] || [];

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

    // Si quieres el total, devuelve la suma de todos los importes
    if (obtenerTotal) {
      return cobranzas.reduce((total: number, caja: any) => {
        return (
          total +
          clavesImportes.reduce((subtotal: number, clave: string) => {
            const importe = parseFloat(caja[clave]) || 0;
            return subtotal + Math.floor(importe);
          }, 0)
        );
      }, 0);
    } else {
      // Si no es total, devuelve un objeto con los importes desglosados
      return clavesImportes.reduce((result: any, clave: string) => {
        result[`importe${clave.slice(-2)}`] = cobranzas.reduce(
          (subtotal: number, caja: any) => subtotal + Math.floor(parseFloat(caja[clave]) || 0),
          0
        );
        return result;
      }, {});
    }
  }

  function crearCard(total: number, importes: any, categorias: string[]) {
    // Lista de claves de importes en el orden esperado
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

    return {
      total,
      data: categorias.map((categoria, index) => {
        // Usamos la clave del importe que corresponde al índice de la categoría
        const clave = clavesImportes[index];
        return {
          name: categoria,
          valor: importes[clave] || 0, // Aseguramos que si no existe el valor, usemos 0
        };
      }),
      categoria: categorias,
    };
  }

  // Para obtener el total
  const totalActual = calcularImportes(dataTorta, 'actual');

  const totalAnterior = calcularImportes(dataTorta, 'anterior');

  // Para obtener los importes detallados
  const tImportesActual = calcularImportes(dataTorta, 'actual', false);
  const tImportesAnterior = calcularImportes(dataTorta, 'anterior', false);

  const categorias = [
    'Efectivo',
    'Billeteras',
    'Transferencias',
    'Debito',
    'Credito',
    'Financieras',
    'Cheques',
    'Mutuales',
  ];

  const cardUno = crearCard(totalActual, tImportesActual, categorias);

  const cardDos = crearCard(totalAnterior, tImportesAnterior, categorias);

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

      <div className="flex justify-around items-center w-full p-2 gap-2">
        <DonutCard
          fecha={fechaActual}
          titulo="Año"
          total={`$ ${formatearNumero(totalActual)}`}
          data={cardUno.data}
          categories={cardUno.categoria}
          fetching={isFetching}
        />
        <DonutCard
          fecha={fechaAnioAnterior}
          titulo="Año"
          total={`$ ${formatearNumero(totalAnterior)}`}
          data={cardDos.data}
          categories={cardDos.categoria}
          fetching={isFetching}
        />
      </div>
    </div>
  );
}
