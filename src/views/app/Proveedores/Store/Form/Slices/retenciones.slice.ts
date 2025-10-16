import type { StateCreator } from "zustand";
import { z } from "zod";
import { ProveedorDomainSchema } from "@/views/app/Proveedores/Data/domain/proveedor.domain.schema";

/**
 * Esquema del slice derivado del Domain.
 * Nota importante:
 * - En Domain las fechas vienen como timestamp "YYYY-MM-DDTHH:mm:ss" (opcional).
 * - En la UI suele usarse <input type="date"> → se maneja "YYYY-MM-DD" o "".
 *   Para no forzar el formato del Domain en el slice (que es UI), se relajan a string|undefined.
 */
const RetencionesBase = ProveedorDomainSchema.pick({
  // Catálogos (enteros)
  idregbru: true,
  idreggan: true,
  idregiva: true,

  // Exento (booleans)
  exretbru: true,
  exretgan: true,
  exretiva: true,

  // Certificados (strings)
  nexretbru: true,
  nexretgan: true,
  nexretiva: true,

  // Fechas (en Domain: ISO ts opcional)
  fecbru: true,
  fecgan: true,
  feciva: true,
  vtobru: true,
  vtogan: true,
  vtoiva: true,
});

// Relajación de tipos de fechas para UI (acepta "YYYY-MM-DD" o "")
const RetencionesSchema = RetencionesBase.extend({
  fecbru: z.string().optional(),
  fecgan: z.string().optional(),
  feciva: z.string().optional(),
  vtobru: z.string().optional(),
  vtogan: z.string().optional(),
  vtoiva: z.string().optional(),
});

export type RetencionesData = z.infer<typeof RetencionesSchema>;

export type RetencionesSlice = RetencionesData & {
  setRetencionesField: <K extends keyof RetencionesData>(
    key: K,
    value: RetencionesData[K]
  ) => void;

  setRetencionesAll: (p: Partial<RetencionesData>) => void;
  resetRetenciones: () => void;

  /** Vista derivada para tablas genéricas (booleano de “tiene régimen” según id>0). */
  asArrayForTable: () => Array<{
    id: "IB" | "GAN" | "IVA";
    tipo: string;
    regimen: boolean;
    exento: boolean;
    certificado?: string;
    vigenciaDesde?: string;
    vigenciaHasta?: string;
  }>;
};

/** Defaults coherentes con inputs controlados */
const INITIAL_RET = (): RetencionesData => ({
  // Catálogos: 0 = sin régimen seleccionado
  idregbru: 0,
  idreggan: 0,
  idregiva: 0,

  // Exentos
  exretbru: false,
  exretgan: false,
  exretiva: false,

  // Certificados (nullable en BE → aquí "" y dtoOut mapea ""→null)
  nexretbru: "",
  nexretgan: "",
  nexretiva: "",

  // Fechas (UI-friendly, no ISO ts)
  fecbru: undefined,
  fecgan: undefined,
  feciva: undefined,
  vtobru: undefined,
  vtogan: undefined,
  vtoiva: undefined,
});

export const createRetencionesSlice: StateCreator<RetencionesSlice> = (set, get) => ({
  ...INITIAL_RET(),

  setRetencionesField: (key, value) =>
    set(() => ({ [key]: value } as Partial<RetencionesData>)),

  setRetencionesAll: (p) =>
    set(() => ({
      ...INITIAL_RET(),
      ...p,
    })),

  resetRetenciones: () => set(INITIAL_RET()),

  asArrayForTable: () => {
    const s = get();
    return [
      {
        id: "IB" as const,
        tipo: "Ingresos Brutos",
        regimen: (s.idregbru ?? 0) > 0,
        exento: s.exretbru,
        certificado: s.nexretbru,
        vigenciaDesde: s.fecbru,
        vigenciaHasta: s.vtobru,
      },
      {
        id: "GAN" as const,
        tipo: "Ganancias",
        regimen: (s.idreggan ?? 0) > 0,
        exento: s.exretgan,
        certificado: s.nexretgan,
        vigenciaDesde: s.fecgan,
        vigenciaHasta: s.vtogan,
      },
      {
        id: "IVA" as const,
        tipo: "IVA",
        regimen: (s.idregiva ?? 0) > 0,
        exento: s.exretiva,
        certificado: s.nexretiva,
        vigenciaDesde: s.feciva,
        vigenciaHasta: s.vtoiva,
      },
    ];
  },
});
