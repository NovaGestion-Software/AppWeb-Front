/** Lista de claves de importes relevantes para Donut */
export const CLAVES_IMPORTES = [
  "importe01",
  "importe02",
  "importe03",
  "importe06",
  "importe07",
  "importe08",
  "importe09",
  "importe11",
] as const;

export type ClaveImporte = typeof CLAVES_IMPORTES[number];
