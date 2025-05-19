import { Dispatch, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { obtenerTortaCobranzasR } from '@/services/AppService';
import DonutCard from './DonutCard';
import ViewTitle from '@/frontend-resourses/components/Labels/ViewTitle';

interface GraficoTortaProps {
  handleRefetch: boolean;
  setHandleRefetch: Dispatch<React.SetStateAction<boolean>>;
}
// funcion para obtener el año, y el anterior y posterior segun parametros.
export function getYears(params?: { anteriores?: number; posteriores?: number; type?: 'string' | 'number' }) {
  const actual = new Date().getFullYear();

  // Desestructuramos params con valores por defecto si está undefined
  const {
    anteriores,
    posteriores,
    type = 'number', // Valor por defecto si no se pasa
  } = params ?? {};

  const generar = (cantidad: number, sentido: 'anterior' | 'posterior') => Array.from({ length: cantidad }, (_, i) => (sentido === 'anterior' ? actual - (i + 1) : actual + (i + 1)));

  const anterioresRaw = anteriores ? generar(anteriores, 'anterior') : undefined;
  const posterioresRaw = posteriores ? generar(posteriores, 'posterior') : undefined;

  const anterioresFinal = anterioresRaw ? (anteriores === 1 ? anterioresRaw[0] : anterioresRaw) : undefined;

  const posterioresFinal = posterioresRaw ? (posteriores === 1 ? posterioresRaw[0] : posterioresRaw) : undefined;

  if (type === 'string') {
    return {
      actual: String(actual),
      ...(anterioresFinal !== undefined && {
        anteriores: Array.isArray(anterioresFinal) ? anterioresFinal.map(String) : String(anterioresFinal),
      }),
      ...(posterioresFinal !== undefined && {
        posteriores: Array.isArray(posterioresFinal) ? posterioresFinal.map(String) : String(posterioresFinal),
      }),
    };
  }

  return {
    actual,
    ...(anterioresFinal !== undefined && { anteriores: anterioresFinal }),
    ...(posterioresFinal !== undefined && { posteriores: posterioresFinal }),
  };
}

export function formatearNumero(numero: number) {
  if (numero < 1000000) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Formato con puntos para miles
  } else {
    const millones = numero / 1000000;
    return `${Math.floor(millones)}M`; // Formato en millones sin decimales
  }
}

export function calcularImportes(data: any, tipoCobranza: string, obtenerTotal: boolean = true) {
  const index = tipoCobranza === 'actual' ? 2 : 3;
  const key = tipoCobranza === 'actual' ? 'cobranzasAñoActual' : 'cobranzasAñoAnterior';
  const cobranzas = data?.[index]?.[key] || [];

  const clavesImportes = ['importe01', 'importe02', 'importe03', 'importe06', 'importe07', 'importe08', 'importe09', 'importe11'];

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
      result[`importe${clave.slice(-2)}`] = cobranzas.reduce((subtotal: number, caja: any) => subtotal + Math.floor(parseFloat(caja[clave]) || 0), 0);
      return result;
    }, {});
  }
}

export function crearCard(total: number, importes: any, categorias: string[]) {
  // Lista de claves de importes en el orden esperado
  const clavesImportes = ['importe01', 'importe02', 'importe03', 'importe06', 'importe07', 'importe08', 'importe09', 'importe11'];

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

  // objeto de años devueltos en string.
  const años = getYears({ anteriores: 1, type: 'string' });
  // as String esta porque lo necesita DonutCard
  const añoActual = años.actual as string;
  const añoAnterior = años?.anteriores as string;

  // Para obtener el total
  const totalActual = calcularImportes(dataTorta, 'actual');

  const totalAnterior = calcularImportes(dataTorta, 'anterior');

  // Para obtener los importes detallados
  const tImportesActual = calcularImportes(dataTorta, 'actual', false);
  const tImportesAnterior = calcularImportes(dataTorta, 'anterior', false);

  const categorias = ['Efectivo', 'Billeteras', 'Transferencias', 'Debito', 'Credito', 'Financieras', 'Cheques', 'Mutuales'];

  const cardUno = crearCard(totalActual, tImportesActual, categorias);
  console.log('card', cardUno.data);
  console.log('dataTorta', dataTorta);
  console.log('totalActual', totalActual);
  console.log('tImportesActual', tImportesActual);

  const cardDos = crearCard(totalAnterior, tImportesAnterior, categorias);

  return (
    <div className="mt-10">
      <ViewTitle  title="Cobranza de Créditos"/>
      <div className="flex flex-col w-full h-full px-12 py-6 bg-white rounded-b-md shadow-none transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-400 ">
        <div className="flex flex-col gap-1 mb-5">
          <p className="text-slate-500 left-1">Distribución según Forma de Pago:</p>
        </div>

        <div className="flex justify-around items-center w-full p-2 gap-2">
          <DonutCard fecha={añoActual} titulo="Año" label={`$ ${formatearNumero(totalActual)}`} data={cardUno.data} categories={cardUno.categoria} fetching={isFetching} />

          <div className="w-px h-60 ml-5 mr-10 bg-gray-300"></div>

          <DonutCard fecha={añoAnterior} titulo="Año" label={`$ ${formatearNumero(totalAnterior)}`} data={cardDos.data} categories={cardDos.categoria} fetching={isFetching} />
        </div>
      </div>
    </div>
  );
}
