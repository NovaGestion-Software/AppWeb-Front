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

export async function obtenerStock(rubros: string[]) {
  try {
    const url = `/apinovades/generico/obtenerStock.php`;

    const datos = {
      _e: '000012',
      _m: 'prod',
      _r: 'JSON',
      _j: rubros,
    };

    // console.log(datos);

    const { data } = await apiPhp(url, {
      method: 'POST',
      data: datos,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    console.log(error);
  }
}

export async function obtenerProductos(secciones: string[], rubros: string[]) {
  try {
    const url = `/apinovades/generico/obtenerProducto.php?_i={"_e":"12","_s":"08","_m":"prod"}`;

    const datos = { secciones, rubros };
    console.log(datos);
    // Enviar las secciones y rubros en el cuerpo de la solicitud
    const { data } = await apiPhp(url, {
      method: 'POST',
      data: datos,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    console.log(error);
  }
}
