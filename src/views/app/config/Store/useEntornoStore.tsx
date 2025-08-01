// src/store/useEntornoStore.ts
import { create } from "zustand";

type Homologacion = "prod" | "homo";
type Entorno = "production" | "development";
type ProjectType = "prod" | "dev";

interface EntornoState {
  entorno: Entorno;
  setEntorno: (nuevo: Entorno) => void;

  homologacion: Homologacion;
  setHomologacion: (nuevo: Homologacion) => void;

  projectType: ProjectType;
  setProjectType: (nuevo: ProjectType) => void;
}

export const useEntornoStore = create<EntornoState>((set) => ({
  entorno: (localStorage.getItem("_ce") as Entorno) || "development",
  setEntorno: (nuevo) => {
    localStorage.setItem("_ce", nuevo);
    set({ entorno: nuevo });
  },

  homologacion: (localStorage.getItem("modo") as Homologacion) || "homo",
  setHomologacion: (nuevo) => {
    localStorage.setItem("modo", nuevo);
    set({ homologacion: nuevo });
  },

  projectType: (localStorage.getItem("_p") as ProjectType) || "dev",
  setProjectType: (nuevo) => {
    localStorage.setItem("_p", nuevo);
    set({ projectType: nuevo });
  },
}));
