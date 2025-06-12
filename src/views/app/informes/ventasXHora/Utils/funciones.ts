// hooks/useHandleClearData.ts
import { useQueryClient } from "@tanstack/react-query";
import { useVentasHoraStore } from "../store/useVentasHoraStore";

export const useHandleClearData = () => {
  const queryClient = useQueryClient();
  const { setEstaProcesado, setFooter, resetStore, setFoco } = useVentasHoraStore();

  const handleClearData = () => {
    setEstaProcesado(false);
    setFooter(false);
    setFoco(true);
    resetStore();
    queryClient.removeQueries({ queryKey: ["ventas"] });
  };

  return handleClearData;
};
