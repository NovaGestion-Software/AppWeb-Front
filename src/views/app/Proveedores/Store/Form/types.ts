// /Components/Form/Data/Store/types.ts

import { ProovedoresEsquema } from "@/schemas/Proovedores/proovedores.esquema";
import { z } from "zod";

/** Identificación comercial compartida por todas las tabs */
export type IdentificacionState = {
  codigo: string;
  razonSocial: string;
};

export type IdentificacionActions = {
  setCodigo: (v: string) => void;
  setRazonSocial: (v: string) => void;
  resetIdentificacion: () => void;
  /** Acción placeholder, se implementa integración real más adelante */
  searchByCodigo: (codigo: string) => void;
};

/** Datos Comerciales (tab 1) */
export type DatosComercialesState = {
  inhabilitado: boolean;
  fechaAlta: string | null; // ISO "YYYY-MM-DD" o null
  telefono1: string;
  telefono2: string;
  nombreFantasia: string;
  fax1: string;
  fax2: string;
  domicilio: string;
  entreCalles: string;
  localidad: string;
  cp: string;
  provincia: string;
  email: string;
  lat: string;
  lng: string;
};

export type DatosComercialesActions = {
  setField: <K extends keyof DatosComercialesState>(key: K, value: DatosComercialesState[K]) => void;
  resetDatosComerciales: () => void;
};

/** Datos Impositivos (tab 2) — Esqueleto */
export type DatosImpositivosState = {
  categoriaIVA: string;
  cuit: string;
  iibb: string;
};

export type DatosImpositivosActions = {
  setFieldImpositivos: <K extends keyof DatosImpositivosState>(
    key: K,
    value: DatosImpositivosState[K]
  ) => void;
  resetDatosImpositivos: () => void;
};

/** Forma de pago (tab 3) — Esqueleto */
export type FormaPagoState = {
  condicionVenta: string;
  plazoDias: number;
  medioPreferido: string;
};

export type FormaPagoActions = {
  setFieldFormaPago: <K extends keyof FormaPagoState>(key: K, value: FormaPagoState[K]) => void;
  resetFormaPago: () => void;
};



/** Tipo de datos del proveedor tal cual validado/normalizado por Zod (nombres BE) */
export type ProveedoresData = z.infer<typeof ProovedoresEsquema>;