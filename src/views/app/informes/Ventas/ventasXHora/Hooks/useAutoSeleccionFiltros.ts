import { useEffect, useRef } from "react";
import { SucursalesModal } from "@/types";
import { extraerItems } from "@/frontend-resourses/utils/dataManipulation";

type Props = {
  data: any[];
  existenDatos: boolean;
  dataUpdatedAt: number;
  sucursalesSeleccionadas: SucursalesModal[];
  setSucursalesDisponibles: (items: SucursalesModal[]) => void;
  setSucursalesSeleccionadas: (items: SucursalesModal[]) => void;
};

export function useAutoSeleccionSucursales({ data, existenDatos, dataUpdatedAt, sucursalesSeleccionadas, setSucursalesDisponibles, setSucursalesSeleccionadas }: Props) {
  const lastProcessedRef = useRef<number>(0);

  useEffect(() => {
    const yaHayFiltros = sucursalesSeleccionadas.length > 0;

    if (existenDatos && !yaHayFiltros && dataUpdatedAt > lastProcessedRef.current) {
      lastProcessedRef.current = dataUpdatedAt;

      extraerItems({
        data: data,
        itemsKeysGroup: { nsucursal: "nsucursal", sucursal: "sucursal" },
        itemsSeleccionados: [],
        setItemsDisponibles: setSucursalesDisponibles,
        setItemsSeleccionados: setSucursalesSeleccionadas,
      });
    }
  }, [dataUpdatedAt, existenDatos, sucursalesSeleccionadas]);
}
