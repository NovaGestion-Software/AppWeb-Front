import { Status } from "@/frontend-resourses/components/types";

export type UIStatusStore = {
  id: string;
  status: Status;
  estaProcesado: boolean;
  foco: boolean;

  setId: (id: string) => void;
  setStatus: (status: Status) => void;
  setEstaProcesado: (v: boolean) => void;
  setFoco: (v: boolean) => void;

  resetUIStatus: () => void;
};

export const createUIStatusStore = (set: (fn: (state: any) => any) => void): UIStatusStore => ({
  id: "",
  status: "idle",
  estaProcesado: false,
  foco: false,

  setId: (id) => set(() => ({ id })),
  setStatus: (status) => set(() => ({ status })),
  setEstaProcesado: (v) => set(() => ({ estaProcesado: v })),
  setFoco: (v) => set(() => ({ foco: v })),

  resetUIStatus: () =>
    set(() => ({
      id: "",
      status: "idle",
      estaProcesado: false,
      foco: false,
    })),
});
