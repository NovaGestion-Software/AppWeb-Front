import { useQuery } from "@tanstack/react-query";
import { obtenerVentasHora } from "@/services/ApiPhpService";
import { FechasRango } from "@/types";

export const useVentasPorHoraQuery = (fechas: FechasRango | null) => {
  return useQuery({
    queryKey: ["ventas", fechas],
    queryFn: () => (fechas ? obtenerVentasHora(fechas) : null),
    enabled: false,
    staleTime: 5 * 60 * 1000,
    select: (response) => response.data,
  });
};
