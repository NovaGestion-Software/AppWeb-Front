import DonutCard from "@/views/app/dashboard/components/features/donut/DonutCard";
import { extraerItems } from "@/frontend-resourses/utils/dataManipulation";
import { useEffect, useState } from "react";
import { data } from "../ts/data";
type TipoTransformacion = "string" | "number" | "boolean";

 interface DonutData {
    name: string;
    valor: number;
  }


export function transformarTipos<T extends Record<string, any>>(data: T[], tipos: Record<keyof T, TipoTransformacion>): Record<string, any>[] {
  return data.map((item) => {
    const nuevoItem: Record<string, any> = {};

    for (const key in item) {
      const tipo = tipos[key as keyof T];
      const valor = item[key];

      if (tipo === "number") {
        // Si es string con coma decimal, convertir correctamente
        nuevoItem[key] = typeof valor === "string" ? parseFloat(valor.replace(/\./g, "").replace(",", ".")) : Number(valor);
      } else if (tipo === "boolean") {
        nuevoItem[key] = valor === "true" || valor === true ? true : false;
      } else if (tipo === "string") {
        nuevoItem[key] = String(valor);
      } else {
        nuevoItem[key] = valor;
      }
    }

    return nuevoItem;
  });
}

export default function GraficoDeTorta({ className, estaProcesado }: { className?: string, estaProcesado: boolean, }) {
  let procesado = false;
  // secciones dispponibles son props que vienen de la store ?
  const [seccionesDisponibles, setSeccionesDisponibles] = useState<any[]>([]);

  useEffect(() => {
    extraerItems({
      data: data,
      itemsKeysGroup: {
        name: "concepto",
        valor: "importe",
      },
      setItemsDisponibles: setSeccionesDisponibles,
    });
  }, [data]);

 
  const categorias = seccionesDisponibles.map((item) => item.name);
  const dataParaGrafico = transformarTipos(seccionesDisponibles, { valor: "number" }) as DonutData[];

  return (
    <div className={`${className} noneScroll shadow-md  shadow-gray-600`}>
      <DonutCard titulo={`Conceptos`} label={""} 
      flexRow={true }
      data={estaProcesado ? dataParaGrafico: []} categories={estaProcesado ? categorias: []} fetching={procesado} donutClassName="h-36 v1440:h-44 v1440:mt-4" />
    </div>
  );
}
