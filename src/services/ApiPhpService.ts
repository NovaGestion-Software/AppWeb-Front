import { isAxiosError } from 'axios';
import apiPhp from '../lib/axiosPhp';
import { FechasRango } from '@/types';

const user = JSON.parse(localStorage.getItem('_u') || '{}');
const empresa = user.empresa ? user.empresa.toString().slice(-2) : '00'; // Extrae los últimos 2 dígitos
export async function obtenerVentasHora(fechas: FechasRango) {
  try {
    console.log('fechas seteadas en funcion', fechas)
    const { from, to } = fechas;
    const url = `/apinova/generico/obtenerVentasHora.php?_i={"_e":"${empresa}","_m":"prod","_fi":"${from}","_ff":"${to}"}`;

    // console.log(url);

    const { data } = await apiPhp(url);
     console.log('data en service', data);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    console.log(error);
  }
}
