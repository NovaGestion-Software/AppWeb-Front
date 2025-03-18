import { isAxiosError } from 'axios';
import { FechasRango } from '@/types';
import apiPhp from '../lib/axiosPhp';

export async function obtenerVentasHora(fechas: FechasRango) {
  try {
    // console.log('fechas seteadas en funcion', fechas);
    const user = JSON.parse(localStorage.getItem('_u') || '{}');
    const empresa = user.empresa ? user.empresa.toString().slice(-2) : '00'; // Extrae los últimos 2 dígitos

    // console.log(empresa);
    const { from, to } = fechas;
    const url = `/apinova/generico/obtenerVentasHora.php?_i={"_e":"${empresa}","_m":"prod","_fi":"${from}","_ff":"${to}"}`;

    // console.log(url);

    const { data } = await apiPhp(url);
    // console.log('data en service', data);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    console.log(error);
  }
}

export async function obtenerRubrosDisponibles() {
  try {
    const url = `/apinovades/generico/obtenerSeccionesRubros.php?_i={"_e":"12","_s":"08","_m":"prod","_o":"1"}`;
    const { data } = await apiPhp(url);

    // console.log(result);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      console.log(error);
      throw new Error('Error desconocido al obtener  secciones de cajas');
    }
  }
}

export async function obtenerProductos() {
  try {
    const url = `/apinovades/generico/obtenerProducto.php`;

    const { data } = await apiPhp(url);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    console.log(error);
  }
}
