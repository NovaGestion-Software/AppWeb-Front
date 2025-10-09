import DonutCard from "@/Components/DonutsChart/DonutCard";
import { useVentasPorSeccionStore } from "../useVentasPorSeccionStore";
import { useEffect, useState } from "react";
import { extraerItems } from "@/frontend-resourses/utils/dataManipulation";
type TipoTransformacion = "string" | "number" | "boolean";

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

export default function GraficoDeTorta({ className, estaProcesado }: { className: string, estaProcesado: boolean, }) {
  const {  secciones } = useVentasPorSeccionStore();
  const [seccionesDisponibles, setSeccionesDisponibles] = useState<any[]>([]);

  useEffect(() => {
    extraerItems({
      data: secciones,
      itemsKeysGroup: {
        name: "nseccion",
        valor: "importe",
      },
      setItemsDisponibles: setSeccionesDisponibles,
    });
  }, [secciones]);
  interface DonutData {
    name: string;
    valor: number;
  }

  const categorias = seccionesDisponibles.map((item) => item.name);
  const dataParaGrafico = transformarTipos(seccionesDisponibles, { valor: "number" }) as DonutData[];

  return (
    <div className={`${className} h-[20rem]`}>
      <DonutCard titulo={`Secciones`} label={""} data={estaProcesado ? dataParaGrafico : []} categories={estaProcesado ? categorias : []} fetching={false} />
    </div>
  );
}
