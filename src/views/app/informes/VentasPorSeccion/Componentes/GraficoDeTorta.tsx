import DonutCard from '@/views/app/dashboard/components/features/donut/DonutCard';
import { useVentasPorSeccionStore } from '../useVentasPorSeccionStore';
import { extraerItems } from '@/frontend-resourses/utils/dataManipulation';
import { useEffect, useState } from 'react';
type TipoTransformacion = 'string' | 'number' | 'boolean';

export function transformarTipos<T extends Record<string, any>>(data: T[], tipos: Record<keyof T, TipoTransformacion>): Record<string, any>[] {
  return data.map((item) => {
    const nuevoItem: Record<string, any> = {};

    for (const key in item) {
      const tipo = tipos[key as keyof T];
      const valor = item[key];

      if (tipo === 'number') {
        // Si es string con coma decimal, convertir correctamente
        nuevoItem[key] = typeof valor === 'string' ? parseFloat(valor.replace(/\./g, '').replace(',', '.')) : Number(valor);
      } else if (tipo === 'boolean') {
        nuevoItem[key] = valor === 'true' || valor === true ? true : false;
      } else if (tipo === 'string') {
        nuevoItem[key] = String(valor);
      } else {
        nuevoItem[key] = valor;
      }
    }

    return nuevoItem;
  });
}

export default function GraficoDeTorta({ className }: { className: string }) {
  const { status, fechas, ventasPorSeccion, secciones } = useVentasPorSeccionStore();
  let procesado = false;
  const [seccionesDisponibles, setSeccionesDisponibles] = useState<any[]>([]);

  useEffect(() => {
    extraerItems({
      data: secciones,
      itemsKeysGroup: {
        name: 'nseccion',
        valor: 'importe',
      },
      setItemsDisponibles: setSeccionesDisponibles,
    });
  }, [ventasPorSeccion]);
  interface DonutData {
    name: string;
    valor: number;
  }

  const categorias = seccionesDisponibles.map((item) => item.name);
  const fechasStr = String(fechas.from);
  const dataParaGrafico = transformarTipos(seccionesDisponibles, { valor: 'number' }) as DonutData[];
  let title = `De ${fechas.from} a ${fechas.to}`;
  console.log('data',dataParaGrafico)

  return (
    <div className={`${className} h-[20rem]`}>
      <DonutCard titulo={`Secciones`} label={''}
       data={dataParaGrafico} categories={categorias} 
       fetching={procesado} />
    </div>
  );
}
