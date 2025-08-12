import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Parametros = {
  parametros: {
    meses: string[];
    años: string[];
  };
  setParametros: (tipo: "meses" | "años", valores: string[]) => void;
};

export type ComparativoMensual = BaseStore &
  Parametros & {
    showParametros: boolean;
    setShowParametros: (show: boolean) => void;
  };
export const useComparativoMensual = create<ComparativoMensual>()(
  persist(
    (set,get) => ({
      ...createBaseStore(set,get),
      showParametros: false,
      setShowParametros: (showParametros: boolean) => set(() => ({ showParametros })),
      parametros: {
        meses: Array(6).fill(""),
        años: Array(6).fill(""),
      },
      setParametros: (tipo, valores) =>
        set((state) => ({
          parametros: {
            ...state.parametros,
            [tipo]: valores,
          },
        })),
    }),
    {
      name: "comparativo-mensual-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
