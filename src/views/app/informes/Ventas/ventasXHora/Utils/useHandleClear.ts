// hooks/useHandleClearData.ts
import { useQueryClient } from "@tanstack/react-query";
import { useVentasHoraStore } from "../store/useVentasHoraStore";

export const useHandleClearData = () => {
  const queryClient = useQueryClient();
  const { setEstaProcesado,  resetStore,foco, setFoco } = useVentasHoraStore();

  const handleClearData = () => {
    setEstaProcesado(false);
    console.log('foco1',foco)
    setFoco(true);
    console.log('foco2',foco)
    resetStore();
    queryClient.removeQueries({ queryKey: ["ventas"] });
  };

  return handleClearData;
};
