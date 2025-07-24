type ColumnaTabla = {
  key: string; // Clave interna, ej: "importe"
  label: string; // Clave en el objeto final, ej: "importeFormateado"
  calcularPorcentaje?: boolean; // Si se calcula %
  totalKey?: string; // A cuál total se relaciona
  parseNumber?: boolean; // Si hay que parsear antes de hacer % (como "importe" con punto)
};

export type ConfigKeys = {
  filtroKey: string;
  agrupadorKey: string;
  innerArrayKey: string;
  sumaKeys: string[];
  convertir: string[];
};

export type ConfigTabla = {
  agrupadorKey: string; // ej: "hora"
  columnas: ColumnaTabla[];
};

;

export const tablaConfig: ConfigTabla = {
  agrupadorKey: "horaini",
  columnas: [
    {
      key: "cantidad",
      label: "nOperaciones",
      calcularPorcentaje: true,
      totalKey: "cantidad",
    },
    {
      key: "importe",
      label: "importe",
      calcularPorcentaje: true,
      totalKey: "importe",
      parseNumber: true,
    },
    {
      key: "pares",
      label: "pares",
      calcularPorcentaje: true,
      totalKey: "pares",
    },
  ],
};

export const agrupacionConfig: ConfigKeys = {
  filtroKey: "nsucursal",
  agrupadorKey: "horaini",
  innerArrayKey: "info",
  sumaKeys: ["importe", "cantidad", "pares"],
  convertir: ["importe"],
};
