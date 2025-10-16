// /views/app/Proveedores/Components/Form/Utils/guards.ts
export type Guard = (next: string, prev: string) => { value: string; error?: string };

export const noAngleBrackets: Guard = (next, prev) => {
  if (/[<>]/.test(next)) {
    return { value: prev, error: "Caracteres '<' y '>' no permitidos" };
  }
  return { value: next };
};

/** Bloquea caracteres de control (rango ASCII 0–31 y 127) */
export const noControlChars: Guard = (next, prev) => {
  // regex: coincide con cualquier control char (\x00–\x1F o \x7F)
  if (/[\x00-\x1F\x7F]/.test(next)) {
    return { value: prev, error: "Caracteres de control no permitidos" };
  }
  return { value: next };
};

/** Combina múltiples guards en cadena (preserva el primer error) */
export function composeGuards(...guards: Array<Guard | undefined>): Guard {
  return (next, prev) => {
    let curr = next;
    let err: string | undefined;
    for (const g of guards) {
      if (!g) continue;
      const r = g(curr, prev);
      curr = r.value;
      err = err ?? r.error;
    }
    return { value: curr, error: err };
  };
}

/** Guard global que se aplica en todos los hooks (bloqueo general de <> y control chars) */
export function globalGuard(): Guard {
  return composeGuards(noAngleBrackets, noControlChars);
}

// --- Primitivos reusables ---
export const limitLength =
  (max: number, msg = `Máximo ${max}`): Guard =>
  (next) =>
    next.length <= max ? { value: next } : { value: next.slice(0, max), error: msg };

export const onlyDigits =
  (max?: number, msg = "Solo dígitos"): Guard =>
  (next) => {
    const clean = next.replace(/\D+/g, "");
    if (max != null && clean.length > max) return { value: clean.slice(0, max), error: `Máximo ${max} dígitos` };
    if (clean !== next) return { value: clean, error: msg };
    return { value: clean };
  };

// hasta 10 decimales, signo, punto
const DEC10 = /^-?\d*(?:\.\d{0,10})?$/;
export const dec10Guard: Guard = (next, prev) => (DEC10.test(next) ? { value: next } : { value: prev, error: "Formato inválido" });

export const noSpaces =
  (max?: number): Guard =>
  (next) => {
    const s = next.replace(/\s+/g, "");
    if (max != null && s.length > max) return { value: s.slice(0, max), error: `Máximo ${max}` };
    return { value: s };
  };

// --- Meta por clave (sencillo; no reglas de negocio) ---
type Meta = { max?: number; digits?: boolean; decimal10?: boolean; noSpaces?: boolean };

export const FieldMeta: Record<string, Meta> = {
  // Identificación
  nombre: { max: 60 }, // o { max: 60, noSpaces: false } si querés permitir espacios
  nfantasia: { max: 60 },

  // Ubicación
  domicilio1: { max: 50 },
  domicilio2: { max: 50 },
  localidad: { max: 20 },
  cpostal: { max: 8 },
  calle1: { max: 40 },
  calle2: { max: 40 },
  latitud: { decimal10: true },
  longitud: { decimal10: true },
  idcodprov: { digits: true, max: 5 },

  // Contacto
  codarea: { digits: true, max: 5 },
  telefono: { digits: true, max: 11 },
  codarea1: { digits: true, max: 5 },
  telefono1: { digits: true, max: 11 },
  codarea2: { digits: true, max: 5 },
  telefono2: { digits: true, max: 11 },
  email: { noSpaces: true, max: 60 },

  // Impositivos
  cuit: { digits: true, max: 11 },
  ibruto: { max: 11 },

  // Forma de pago
  fpago: { max: 40 },
  obs: { max: 200 },
  dias_p: { digits: true, max: 3 },
  dias_v: { digits: true, max: 3 },
  dias_e: { digits: true, max: 3 },

  // Retenciones
  nexretbru: { max: 10 },
  nexretiva: { max: 10 },
  nexretgan: { max: 10 },
  // fec*/vto* son date inputs → no necesitan guard
  // flags/booleans → no necesitan guard
};

// Crea un guard compuesto a partir de la meta
export function guardFromMeta(key: string): Guard | undefined {
  const meta = FieldMeta[key];
  if (!meta) return;
  return (next, prev) => {
    let s = next;
    let err: string | undefined;

    if (meta.noSpaces) {
      const r = noSpaces(meta.max)(s, prev);
      s = r.value;
      err = err ?? r.error;
    } else if (meta.max != null) {
      const r = limitLength(meta.max)(s, prev);
      s = r.value;
      err = err ?? r.error;
    }

    if (meta.digits) {
      const r = onlyDigits(meta.max)(s, prev);
      s = r.value;
      err = err ?? r.error;
    }

    if (meta.decimal10) {
      const r = dec10Guard(s, prev);
      s = r.value;
      err = err ?? r.error;
    }

    return { value: s, error: err };
  };
}
