
const DOC_LABELS: Record<number, string> = {
  0: "CUIT",
  1: "CUIL",
  2: "DNI",
};

const COND_LABELS: Record<number, string> = {
  1: "Responsable Inscripto",
  2: "Exento",
  3: "Categoría 3",
  4: "Categoría 4",
};

export function tipoDocLabel(id: number): string {
  return DOC_LABELS[id] ?? "Desconocido";
}

export function condTribLabel(id: number): string {
  return COND_LABELS[id] ?? "Desconocido";
}
