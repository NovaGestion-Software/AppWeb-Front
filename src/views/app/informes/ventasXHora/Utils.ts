type DatosAgrupados = Record<
  string,
  { cantidad: number; importe: string; pares: number }
>;

type Totales = {
  totalImporte: number;
  totalOperaciones: number;
  totalPares: number;
};
interface ExtraerItemProps {
  data: any[];
  itemKey: string;
  setItemsDisponibles: (items: any) => void;
  itemsSeleccionados: object;
  setItemsSeleccionados: (items: any) => void;
}
type Totales1 = Record<string, number>;
type Resultado = Record<string, Record<string, string | number>>;
type ConfigKeys = {
    filtroKey: string;
    agrupadorKey: string;
    innerArrayKey: string;
    sumaKeys: string[];
    convertir: string[];
  };
  
type ColumnaTabla = {
    key: string; // Clave interna, ej: "importe"
    label: string; // Clave en el objeto final, ej: "importeFormateado"
    calcularPorcentaje?: boolean; // Si se calcula %
    totalKey?: string; // A cuál total se relaciona
    parseNumber?: boolean; // Si hay que parsear antes de hacer % (como "importe" con punto)
  };
  type ConfigTabla = {
  agrupadorKey: string; // ej: "hora"
  columnas: ColumnaTabla[];
};
// extrae y setea items para filtro.
   export function extraerItems({
    data,
    itemKey,
    setItemsDisponibles,
    itemsSeleccionados,
    setItemsSeleccionados,
  }: ExtraerItemProps) {
    if (data?.length) {
      console.log("en la funcion, datos", data);
      const filtro = data.map((item) => item?.[itemKey]); // ✅ CORREGIDO

      console.log("en la funcion, filtro", filtro);
      setItemsDisponibles(filtro);
      if (itemsSeleccionados) {
        setItemsSeleccionados(filtro);
      }
    }
  }

  // extrae y arma un nuevo conjunto basado en el indice.
   export function extraerItemsDeIndice(data: any[], nivel1: string, nivel2: string) {
    const valores = new Set<string>();

    if (data.length > 0) {
      data?.forEach((item) => {
        item[nivel1]?.forEach((subItem: any) => {
          valores.add(subItem[nivel2]);
        });
      });
    }

    return Array.from(valores).sort();
  }

  // funcion nueva,agrupa por indice
   export function agruparPorIndice<T>(
    data: T[] | null,
    filtrosSeleccionados: string[] | null,
    itemsDeIndice: string[],
    config: ConfigKeys,
    convertirFn: (value: number) => string
  ): { datos: Resultado; totales: Totales1 } {
    const resultado: Resultado = {};
    const totales: Totales1 = {};

    if (!filtrosSeleccionados || filtrosSeleccionados.length === 0) {
      return { datos: resultado, totales };
    }

    // Inicializar todos los items del índice
    itemsDeIndice.forEach((indice) => {
      resultado[indice] = {};
      config.sumaKeys.forEach((key) => {
        resultado[indice][key] = config.convertir.includes(key) ? "0" : 0;
      });
    });

    data?.forEach((item: any) => {
      if (!filtrosSeleccionados.includes(item[config.filtroKey])) return;

      item[config.innerArrayKey].forEach((subItem: any) => {
        const indice = subItem[config.agrupadorKey]?.trim();
        if (!resultado[indice]) return;

        config.sumaKeys.forEach((key) => {
          const valor = parseFloat(subItem[key]) || 0;

          // Sumar al resultado
          const actual = parseFloat(resultado[indice][key] as string) || 0;
          const nuevo = parseFloat((actual + valor).toFixed(2));

          resultado[indice][key] = config.convertir.includes(key)
            ? nuevo.toString()
            : nuevo;

          // Sumar a los totales
          totales[key] = parseFloat(((totales[key] || 0) + valor).toFixed(2));
        });
      });
    });

    // Convertir con función si aplica
    for (const indice in resultado) {
      config.convertir.forEach((key) => {
        const valor = parseFloat(resultado[indice][key] as string);
        resultado[indice][key] = convertirFn(valor);
      });
    }

    return { datos: resultado, totales };
  }

  // crea datos para tabla.
   export function crearDataParaTablaModular(
    datosAgrupados: Record<string, Record<string, string | number>>,
    totales: Record<string, number>,
    config: ConfigTabla
  ) {
    const entries = Object.entries(datosAgrupados).sort((a, b) =>
      a[0].localeCompare(b[0])
    );

    return entries.map(([agrupadorValor, datos], index) => {
      const fila: Record<string, string | number> = {
        id: index + 1,
        [config.agrupadorKey]: agrupadorValor,
      };

      config.columnas.forEach((col) => {
        const valorRaw = datos[col.key];
        const valorNumerico = col.parseNumber
          ? parseFloat((valorRaw as string).replace(/\./g, ""))
          : (valorRaw as number);

        // Valor base
        fila[col.label] = valorRaw;

        // Porcentaje si aplica
        if (
          col.calcularPorcentaje &&
          col.totalKey &&
          totales[col.totalKey] > 0
        ) {
          const porcentaje = (
            (valorNumerico / totales[col.totalKey]) *
            100
          ).toFixed(2);
          fila[`porcentaje${capitalize(col.label)}`] = porcentaje;
        }
      });

      return fila;
    });
  }

   export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  // funcion para encontrar el valor maximo y a que hora pertece
   export function obtenerValorMaximoConIndice<T>(
    datos: T[],
    key: keyof T,
    indiceKey: keyof T
  ): { maxValue: number; indice: string | null } {
    let maxValue = -Infinity;
    let indice: string | null = null;

    datos.forEach((currentItem) => {
      const currentValue =
        typeof currentItem[key] === "string"
          ? parseFloat(currentItem[key].replace(/\./g, "").replace(",", "."))
          : (currentItem[key] as number);

      if (currentValue > maxValue) {
        maxValue = currentValue;
        indice = String(currentItem[indiceKey]); // Convertimos a string en caso de ser otro tipo
      }
    });

    return { maxValue, indice };
  }