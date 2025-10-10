// /Store/Form/Slices/formData.slice.ts
import type { StateCreator } from "zustand";

// 🔁 Legacy (payload “crudo” del backend, esquema anterior)
import { ProveedoresData } from "../types";
import { ProovedoresEsquema } from "@/schemas/Proovedores/proovedores.esquema";

// ✅ Nuevo (Domain/UI normalizado)
import {
  ProveedorDomain,
  ProveedorDomainSchema,
} from "@/views/app/Proveedores/Data/domain/proveedor.domain.schema";

export interface DatosFormSlice {
  /** Snapshots del formulario — ahora en Domain */
  datosIniciales: ProveedorDomain | null;
  datosActuales: ProveedorDomain | null;

  /** Set directo (Domain) */
  setDatosIniciales: (d: ProveedorDomain | null) => void;
  setDatosActuales: (d: ProveedorDomain | null) => void;

  /** NUEVO: normaliza (Domain) y setea como inicial/actual */
  setDatosInicialesFromDomain: (row: unknown) => void;
  setDatosActualesFromDomain: (row: unknown) => void;

  /** LEGACY: normaliza (Row crudo) y setea como inicial/actual */
  setDatosInicialesFromRow: (row: unknown) => void;
  setDatosActualesFromRow: (row: unknown) => void;

  /** Snapshot actual desde los slices — devuelve Domain */
  snapshotActualFromSlices: () => ProveedorDomain;

  /** Aplica un objeto Domain a todos los slices (usar este en adelante) */
  applyToSlices: (data: ProveedorDomain) => void;

  /** LEGACY: aplica un objeto “Row crudo” a los slices */
  applyToSlicesFromRow: (data: ProveedoresData) => void;

  /** NUEVO: normaliza Domain, aplica a los slices y guarda en actuales */
  hydrateAllFromDomain: (row: unknown) => void;

  /** LEGACY: normaliza Row crudo, aplica a los slices y guarda en actuales */
  hydrateAllFromRow: (row: unknown) => void;

  /** Limpia formulario */
  resetDatosForm: () => void;
}

export const createDatosFormSlice: StateCreator<DatosFormSlice> = (set, get) => ({
  datosIniciales: null,
  datosActuales: null,

  // ------------------------
  // Setters directos (Domain)
  // ------------------------
  setDatosIniciales: (d) => set({ datosIniciales: d }),
  setDatosActuales: (d) => set({ datosActuales: d }),

  // ---------------------------------------
  // NUEVO: Set desde Domain (con validación)
  // ---------------------------------------
  setDatosInicialesFromDomain: (row) => {
    const parsed = ProveedorDomainSchema.parse(row);
    set({ datosIniciales: parsed });
  },
  setDatosActualesFromDomain: (row) => {
    const parsed = ProveedorDomainSchema.parse(row);
    set({ datosActuales: parsed });
  },

  // ----------------------------------------
  // LEGACY: Set desde Row crudo (compatibilidad)
  // ----------------------------------------
  setDatosInicialesFromRow: (row) => {
    const parsed = ProovedoresEsquema.parse(row);
    // ⚠️ Si querés migrar a Domain acá, podrías mapear a Domain antes de guardar.
    // Por ahora, mantenemos compat y casteamos al tipo nuevo:
    set({ datosIniciales: parsed as unknown as ProveedorDomain });
  },

  setDatosActualesFromRow: (row) => {
    const parsed = ProovedoresEsquema.parse(row);
    set({ datosActuales: parsed as unknown as ProveedorDomain });
  },

  // --------------------------------------------------------
  // Snapshot actual de TODOS los slices → objeto Domain plano
  // --------------------------------------------------------
  snapshotActualFromSlices: () => {
  const s = get() as any;

  // Helpers de normalización para Domain
  const str = (v: any) => (v == null ? "" : String(v));
  const num = (v: any) => (Number.isFinite(Number(v)) ? Number(v) : 0);
  const bool = (v: any) => !!v;

  // Fechas Domain: ISO-like "YYYY-MM-DDTHH:mm:ss" | undefined
  const iso = (v: any) => {
    if (!v) return undefined;
    const sv = String(v);
    // Acepto "YYYY-MM-DDTHH:mm:ss" y dejo pasar si ya matchea
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(sv)) return sv;
    // Si viniera "YYYY-MM-DD HH:mm:ss", lo convierto
    const m = /^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})$/.exec(sv);
    if (m) return `${m[1]}T${m[2]}`;
    // Cualquier otro caso: indefinido (para que la API luego lo mande como null)
    return undefined;
  };

  // Identificación
  const ident = {
    idprovee: num(s.idprovee),
    nombre: str(s.nombre),
    nfantasia: str(s.nfantasia),
  };

  // Metadatos
  const meta = {
    inha: bool(s.inha),
    idnodo: num(s.idnodo),
    icambio: num(s.icambio),
    ncambio: num(s.ncambio),
    usuario_a: num(s.usuario_a),
    usuario_m: num(s.usuario_m),
    usuario_b: num(s.usuario_b),
    f_alta: iso(s.f_alta),
    f_modi: iso(s.f_modi),
    f_baja: iso(s.f_baja),
  };

  // Ubicación
  const ubic = {
    domicilio1: str(s.domicilio1),
    domicilio2: str(s.domicilio2),
    localidad: str(s.localidad),
    cpostal: str(s.cpostal),
    calle1: str(s.calle1),
    calle2: str(s.calle2),              // << antes podía venir undefined
    latitud: str(s.latitud),
    longitud: str(s.longitud),
    idcodprov: num(s.idcodprov),
  };

  // Contacto
  const contacto = {
    codarea: str(s.codarea),            // << defaults ""
    telefono: str(s.telefono),
    codarea1: str(s.codarea1),
    telefono1: str(s.telefono1),
    codarea2: str(s.codarea2),
    telefono2: str(s.telefono2),
    email: str(s.email),
  };

  // Retenciones
  const ret = {
    idregbru: bool(s.idregbru),
    exretbru: bool(s.exretbru),
    nexretbru: str(s.nexretbru),        // << defaults ""
    fecbru: iso(s.fecbru),
    vtobru: iso(s.vtobru),

    idreggan: bool(s.idreggan),
    exretgan: bool(s.exretgan),
    nexretgan: str(s.nexretgan),        // << defaults ""
    fecgan: iso(s.fecgan),
    vtogan: iso(s.vtogan),

    idregiva: bool(s.idregiva),
    exretiva: bool(s.exretiva),
    nexretiva: str(s.nexretiva),        // << defaults ""
    feciva: iso(s.feciva),
    vtoiva: iso(s.vtoiva),
  };

  // Datos impositivos
  const imp = {
    ibruto: str(s.ibruto),
    idctrib: num(s.idctrib),
    idtdoc: num(s.idtdoc),
    cuit: str(s.cuit),
  };

  // Forma de pago
  const fp = {
    fpago: str(s.fpago),
    dias_p: num(s.dias_p),
    dias_v: num(s.dias_v),
    dias_e: num(s.dias_e),
    // obs: si está vacío, igual la mando como "" para cumplir Domain z.string()
    obs: str(s.obs),                    // << antes podía ser undefined
    f_pesos: bool(s.f_pesos),
    f_dolares: bool(s.f_dolares),
  };

  const merged = {
    ...ident,
    ...meta,
    ...ubic,
    ...contacto,
    ...ret,
    ...imp,
    ...fp,
  };

  // Validación final coherente con Domain
  return ProveedorDomainSchema.parse(merged);
},

  // --------------------------------------------
  // Aplica un objeto Domain a los slices (NUEVO)
  // --------------------------------------------
  applyToSlices: (data: ProveedorDomain) => {
    const st = get() as any;
    // Si ya migraste el store, delegá al hidratador de Domain:
    st.hydrateAllSlicesFromDomain?.(data);
  },

  // -------------------------------------------------------
  // LEGACY: aplica un Row crudo a los slices (compatibilidad)
  // -------------------------------------------------------
  applyToSlicesFromRow: (data: ProveedoresData) => {
    const st = get() as any;
    st.hydrateAllSlicesFromRow?.(data);
  },

  // -----------------------------------------------------------
  // NUEVO: Normaliza Domain, aplica a los slices y guarda actuales
  // -----------------------------------------------------------
  hydrateAllFromDomain: (row: unknown) => {
    const parsed = ProveedorDomainSchema.parse(row);
    const st = get() as any;
    st.hydrateAllSlicesFromDomain?.(parsed);
    set({ datosActuales: parsed });
  },

  // ---------------------------------------------------------
  // LEGACY: Normaliza Row crudo, aplica a los slices y guarda
  // ---------------------------------------------------------
  hydrateAllFromRow: (row: unknown) => {
    const parsed = ProovedoresEsquema.parse(row);
    const st = get() as any;
    st.hydrateAllSlicesFromRow?.(parsed);
    set({ datosActuales: parsed as unknown as ProveedorDomain });
  },

  // ----------------
  // Limpia formulario
  // ----------------
  resetDatosForm: () => set({ datosIniciales: null, datosActuales: null }),
});
