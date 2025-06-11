import { useQueryClient } from "@tanstack/react-query";
import { useVentasHoraStore } from "../store/useVentasHoraStore";

// CLEAR DATA

export const handleClearData = () => {
    const queryClient = useQueryClient();
    const { setEstaProcesado, setFooter, resetStore, setFoco } = useVentasHoraStore();
  // esto en el archivo funciones.ts se pasa desde la store
  setEstaProcesado(false);
  // se crea [footer, set footer] en la store, se pasa aca y en la tabla.
  setFooter(false);
  // hay que crearlo en la store en una parte de ui.
  setFoco(true);
  // esto cambiarlo por un reset de store
  resetStore();
  queryClient.removeQueries({ queryKey: ["ventas"] });
};
