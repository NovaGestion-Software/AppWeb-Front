import { useMemo } from "react";

import { formatearNumero } from "@/utils";
import { SucursalesModal, VentaPorHora } from "@/types";
import { ConfigKeys, ConfigTabla } from "../config/tabla.config";
import { agruparPorIndice, crearDataParaTablaModular, extraerItemsDeIndice } from "@/frontend-resourses/utils/dataManipulation";

type Props = {
  data: any[];
  sucursalesSeleccionadas: SucursalesModal[];
  config: ConfigKeys;
  configTabla: ConfigTabla;
};

export function useProcesarDatosTabla({
  data,
  sucursalesSeleccionadas,
  config,
  configTabla,
}: Props) {
  const indiceTabla = useMemo(
    () => extraerItemsDeIndice(data, config.innerArrayKey, config.agrupadorKey),
    [data, config]
  );
  const sucursalesSeleccionadasStr = sucursalesSeleccionadas.map((s) => s.nsucursal);


  const { datos, totales } = useMemo(() => {
    return agruparPorIndice(data, sucursalesSeleccionadasStr, indiceTabla, config, formatearNumero);
  }, [data, sucursalesSeleccionadas, indiceTabla, config]);

  const filasGenericas = useMemo(
    () => crearDataParaTablaModular(datos, totales, configTabla),
    [datos, totales, configTabla]
  );

  const filas: VentaPorHora[] = useMemo(
    () =>
      filasGenericas.map((fila) => ({
        id: fila.id as number,
        horaini: fila.horaini as string,
        nOperaciones: fila.nOperaciones as number,
        porcentajeNOperaciones: fila.porcentajeNOperaciones as string,
        importe: fila.importe as string,
        porcentajeImporte: fila.porcentajeImporte as string,
        pares: fila.pares as number,
        porcentajePares: fila.porcentajePares as string,
      })),
    [filasGenericas]
  );

  return { filas, totales, indiceTabla };
}
