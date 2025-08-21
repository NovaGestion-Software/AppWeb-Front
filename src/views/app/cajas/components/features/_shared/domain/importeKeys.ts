export const IMPORTE_KEYS = [
  "importe01", "importe02", "importe03", "importe04",
  "importe06", "importe07", "importe08", "importe09",
  "importe10", "importe11", "importeva",
] as const;

export type ImporteKey = typeof IMPORTE_KEYS[number];

// Claves “especiales”
export const SPECIAL_IMPORTES = {
  giftCard: "importegif",
  ordenCompra: "importecom",
} as const;
