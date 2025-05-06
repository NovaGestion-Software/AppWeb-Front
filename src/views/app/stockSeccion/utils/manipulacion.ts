
// fn obtener faltantes y presentes en data.
export function idItemsEnData<T extends Record<string, any>>(rubrosSeleccionados: string[], data: T[], key: keyof T): { faltantes: string[]; presentes: string[] } {
    const valoresEnData = new Set(data.map((item) => String(item[key])));
  
    const faltantes = new Set<string>();
    const presentes = new Set<string>();
  
    for (const valor of rubrosSeleccionados) {
      if (valoresEnData.has(valor)) {
        presentes.add(valor);
      } else {
        faltantes.add(valor);
      }
    }
  
    return {
      faltantes: Array.from(faltantes),
      presentes: Array.from(presentes),
    };
  }
  
  // fn para no pedir items ya traidos
  export function FiltrarItemsTraidos(itemsSeleccionados: string[], itemsTraidos: string[]): string[] {
    // Si no hay rubros traídos, devolvemos todos los seleccionados como pendientes
    if (!itemsTraidos || itemsTraidos.length === 0) {
      return itemsSeleccionados;
    }
  
    // Filtramos los items seleccionados que NO están en los items traídos
    const resultado = itemsSeleccionados.filter((item) => !itemsTraidos.includes(item));
  
    return resultado;
  }
  
  // fn para buscar y extraer nombre e id de los rubros en base a un array de ids.
  interface Item {
    [key: string]: string; // Esto permitirá tener cualquier clave con un valor de tipo string
  }
  export function buscarEnArray(
    ItemsParaBuscar: string[], // Array con los rubros a buscar
    data: any[], // Datos a buscar dentro
    contenedorKey: string, // Clave para acceder a la lista de rubros dentro de cada sección
    itemProp1Key: string, // Clave que indica el ID (ej. rubro, pelota)
    itemProp2Key: string // Clave que indica el nombre (ej. nrubro, npelota)
  ) {
    return data.flatMap((contenedor) =>
      contenedor[contenedorKey] // Accede a la lista dinámica de rubros usando la clave rubrosKey
        .filter((item: Item) => ItemsParaBuscar.includes(item[itemProp1Key])) // Filtra los rubros que coinciden con el array rubrosParaBuscar
        .map((item: Item) => ({
          id: item[itemProp1Key], // Obtiene el ID usando rubroKey
          nombre: item[itemProp2Key], // Obtiene el nombre usando nombreKey
        }))
    );
  }
  
  // Función para comparar si dos arrays son iguales (independientemente del orden)
  export function areArraysEqual(array1: any[], array2: any[]) {
    if (array1.length !== array2.length) return false;
    return array1.every((item) => array2.includes(item));
  }
  