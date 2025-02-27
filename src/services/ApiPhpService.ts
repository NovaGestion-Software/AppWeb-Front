import { isAxiosError } from 'axios';
import apiPhp from '../lib/axiosPhp';
import { ResponseVentasHora } from '../types';

export async function obtenerVentasHora(from: string, to: string) {
  try {
    const url = `/apinova/generico/obtenerVentasHora.php?_i={"_e":"12","_m":"prod","_fi":"${from}","_ff":"${to}"}`;

    const { data } = await apiPhp(url);

    // console.log(data.data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    console.log(error);
  }
}
