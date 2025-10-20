import type { StateCreator } from "zustand";
import {
  ProveedorDomain,
  ProveedorDomainSchema,
} from "@/views/app/Proveedores/Data/domain/proveedor.domain.schema";

export interface DatosFormSlice {
  /** Snapshots del formulario — siempre en Domain */
  datosIniciales: ProveedorDomain | null;
  datosActuales: ProveedorDomain | null;

  /** Set directo (Domain) */
  setDatosIniciales: (d: ProveedorDomain | null) => void;
  setDatosActuales: (d: ProveedorDomain | null) => void;

  /** Set desde unknown validando Domain */
  setDatosInicialesFromDomain: (row: unknown) => void;
  setDatosActualesFromDomain: (row: unknown) => void;

  /** Construye un Domain desde el estado actual de los slices */
  snapshotActualFromSlices: () => ProveedorDomain;

  /** Aplica un Domain a todos los slices (hidrata UI) */
  applyToSlices: (data: ProveedorDomain) => void;

  /** Normaliza Domain, aplica a los slices y guarda en actuales */
  hydrateAllFromDomain: (row: unknown) => void;

  /** Limpia formulario */
  resetDatosForm: () => void;
}

export const createDatosFormSlice: StateCreator<DatosFormSlice> = (set, get) => ({
  datosIniciales: null,
  datosActuales: null,

  // Setters directos
  setDatosIniciales: (d) => set({ datosIniciales: d }),
  setDatosActuales: (d) => set({ datosActuales: d }),

  // Set desde unknown validando Domain
  setDatosInicialesFromDomain: (row) => {
    const parsed = ProveedorDomainSchema.parse(row);
    set({ datosIniciales: parsed });
  },
  setDatosActualesFromDomain: (row) => {
    const parsed = ProveedorDomainSchema.parse(row);
    set({ datosActuales: parsed });
  },

  // Snapshot de TODOS los slices → Domain
  snapshotActualFromSlices: () => {
    const s = get() as any;

    // Helpers
    const str = (v: any) => (v == null ? "" : String(v));
    const num = (v: any) => (Number.isFinite(Number(v)) ? Number(v) : 0);
    const bool = (v: any) => !!v;

    // Domain timestamps (YYYY-MM-DDTHH:mm:ss) | undefined
    const isoTs = (v: any): string | undefined => {
      if (!v) return undefined;
      const sv = String(v).trim();
      // ya viene ISO ts
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(sv)) return sv;
      // viene "YYYY-MM-DD HH:mm:ss" → convertir a ISO ts
      const m = /^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})$/.exec(sv);
      if (m) return `${m[1]}T${m[2]}`;
      // viene "YYYY-MM-DD" (inputs date) → asumimos 00:00:00
      if (/^\d{4}-\d{2}-\d{2}$/.test(sv)) return `${sv}T00:00:00`;
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
      f_alta: isoTs(s.f_alta),
      f_modi: isoTs(s.f_modi),
      f_baja: isoTs(s.f_baja),
    };

    // Ubicación
    const ubic = {
      domicilio1: str(s.domicilio1),
      domicilio2: str(s.domicilio2),
      localidad: str(s.localidad),
      cpostal: str(s.cpostal),
      calle1: str(s.calle1),
      calle2: str(s.calle2),
      latitud: str(s.latitud),
      longitud: str(s.longitud),
      idcodprov: num(s.idcodprov),
    };

    // Contacto
    const contacto = {
      codarea: str(s.codarea),
      telefono: str(s.telefono),
      codarea1: str(s.codarea1),
      telefono1: str(s.telefono1),
      codarea2: str(s.codarea2),
      telefono2: str(s.telefono2),
      email: str(s.email),
    };

    // Retenciones (¡ojo! idreg* ahora son NÚMEROS, no booleans)
    const ret = {
      idregbru: num(s.idregbru),
      exretbru: bool(s.exretbru),
      nexretbru: str(s.nexretbru),
      fecbru: isoTs(s.fecbru),
      vtobru: isoTs(s.vtobru),

      idreggan: num(s.idreggan),
      exretgan: bool(s.exretgan),
      nexretgan: str(s.nexretgan),
      fecgan: isoTs(s.fecgan),
      vtogan: isoTs(s.vtogan),

      idregiva: num(s.idregiva),
      exretiva: bool(s.exretiva),
      nexretiva: str(s.nexretiva),
      feciva: isoTs(s.feciva),
      vtoiva: isoTs(s.vtoiva),
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
      obs: str(s.obs), // "" permitido en Domain (dtoOut hará ""→null si hace falta)
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

    // Validación final contra Domain
    return ProveedorDomainSchema.parse(merged);
  },

  // Aplica un Domain a todos los slices
  applyToSlices: (data: ProveedorDomain) => {
    const st = get() as any;
    st.hydrateAllSlicesFromDomain?.(data);
  },

  // Normaliza Domain, aplica a los slices y guarda en actuales
  hydrateAllFromDomain: (row: unknown) => {
    const parsed = ProveedorDomainSchema.parse(row);
    const st = get() as any;
    st.hydrateAllSlicesFromDomain?.(parsed);
    set({ datosActuales: parsed });
  },

  // Limpia formulario
  resetDatosForm: () => set({ datosIniciales: null, datosActuales: null }),
});
