import { obtenerProductos } from "@/services/ApiPhpService";
import { useMutation } from "@tanstack/react-query";
import { Data } from "../componentes/TablaSeccionRubro";
import { idItemsEnData } from "@/frontend-resourses/utils/dataManipulation";

export function useObtenerProductos({
  rubrosTraidos,
  setRubrosPendientes,
  setRubrosTraidos,
  setSeccionesTraidas,
  setFooter,
  tablaStock,
  setTablaStock,
  setStatus,
  seccionesParaTraer,
  rubrosParaTraer,
  handleError,
}: {
  rubrosTraidos: string[];
  setRubrosPendientes: (v: string[]) => void;
  setRubrosTraidos: (v: string[]) => void;
  setSeccionesTraidas: (v: any) => void;
  setFooter: (v: boolean) => void;
  setTablaStock: (v: Data[]) => void;
  setStatus: (status: "error" | "idle" | "pending" | "success" | null) => void;
  seccionesParaTraer: string[];
  rubrosParaTraer: string[];
  handleError: () => void;
  tablaStock: any[],

}) {
  return useMutation({
    mutationFn: () => {
      
      return obtenerProductos(seccionesParaTraer, rubrosParaTraer);
    },
    onMutate: () => {
      setStatus("pending");
    },
    onError: (error) => {
      console.error("Error al obtener los productos:", error);
      setStatus("error");
    },
    onSuccess: (data) => {
      if (!data.data || data.data.length === 0){
        handleError()
      }else{
        const arrayDeRubros: Data[] = Object.values(data.data);
        const { faltantes, presentes } = idItemsEnData(rubrosParaTraer, arrayDeRubros, "rubro");
        setRubrosPendientes(faltantes);
        setRubrosTraidos([...new Set([...rubrosTraidos, ...presentes])]);
        setSeccionesTraidas(seccionesParaTraer ?? {});
        setFooter(true);
        setTablaStock([...tablaStock, ...arrayDeRubros]);
        setStatus("success");
      }
  
    },
    onSettled: () => {
      setStatus("idle");
    },
  });
}
