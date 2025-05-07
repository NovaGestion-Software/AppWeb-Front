import { FechasRango } from '@/types';

export async function handleFetchData(dates: FechasRango): Promise<void> {
  try {
    //  console.log('fechas en handle', dates)
    //   mutate(dates);
  } catch (error) {
    console.error('Error en la petición:', error);
    alert('Error al obtener los datos');
    //   setFoco(true);
  }
}

export function handleClearData() {
  return;
}
