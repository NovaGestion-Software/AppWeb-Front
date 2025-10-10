import type { StateCreator } from "zustand";
import { z } from "zod";
import { ContactoEsquema } from "@/schemas/Proovedores/contacto.schema";
import { UbicacionEsquema } from "@/schemas/Proovedores/ubicacion.schema";

/** Esquema combinado (evita merge deprecado) */
const DatosComercialesEsquema = UbicacionEsquema.extend(ContactoEsquema.shape);

export type DatosComercialesData = z.infer<typeof DatosComercialesEsquema>;

export type DatosComercialesSlice = DatosComercialesData & {
  setDatosComercialesField: <K extends keyof DatosComercialesData>(
    key: K,
    value: DatosComercialesData[K]
  ) => void;

  /** Reemplaza TODO el sub-estado del slice con lo provisto (y defaults). */
  setDatosComercialesAll: (p: Partial<DatosComercialesData>) => void;

  /** Resetea TODO el sub-estado del slice a defaults. */
  resetDatosComerciales: () => void;

  /** Hidrata desde un row validado: reemplaza TODO el sub-estado. */
  hydrateFromRow: (row: unknown) => void;
};

/** ⚙️ Factory: objeto nuevo cada vez (evita referencias compartidas) */
const initialCom = (): DatosComercialesData => ({
  // Ubicación
  domicilio1: "",
  domicilio2: undefined,
  localidad: "",
  cpostal: "",
  calle1: undefined,
  calle2: undefined,
  latitud: "",
  longitud: "",
  idcodprov: 0,
  // Contacto
  codarea: undefined,
  telefono: undefined,
  codarea1: undefined,
  telefono1: undefined,
  codarea2: undefined,
  telefono2: undefined,
  email: undefined,
  fax: undefined,

});

export const createDatosComercialesSlice: StateCreator<DatosComercialesSlice> = (set) => ({
  ...initialCom(),

  setDatosComercialesField: (key, value) =>
    set(() => ({ [key]: value } as Partial<DatosComercialesData>)),

  // ✅ REEMPLAZO TOTAL DEL SUB-ESTADO DEL SLICE
  setDatosComercialesAll: (p) =>
    set(() => ({
      ...initialCom(),
      ...p,
    })),

  // ✅ REEMPLAZO TOTAL (defaults frescos)
  resetDatosComerciales: () =>
    set(() => ({
      ...initialCom(),
    })),

  // ✅ REEMPLAZO TOTAL desde row validado (sin mezclar con estado previo)
  hydrateFromRow: (row) => {
    const parsed = DatosComercialesEsquema.parse(row);
    set(() => ({
      ...initialCom(),
      ...parsed,
    }));
  },
});
