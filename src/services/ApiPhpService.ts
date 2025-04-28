import { isAxiosError } from 'axios';
import { FechasRango } from '@/types';
import apiPhp from '../lib/axiosPhp';

const user = JSON.parse(localStorage.getItem('_u') || '{}');
const empresa = user.empresa ? user.empresa.toString().slice(-2) : '00'; // Extrae los últimos 2 dígitos


export async function obtenerVentasHora(fechas: FechasRango) {
  // funciona con ambos entornos y con homologacion en prod
  const homologacion = localStorage.getItem("homologacion") || "homo"; // o valor default
  const entorno = localStorage.getItem("_ce") || "development";        // o valor default
  console.log('homologacion', homologacion);
  console.log('entorno', entorno);
  try {
    // console.log('fechas seteadas en funcion', fechas);
    // console.log(empresa);
    const { from, to } = fechas;
    const baseSeleccionada = entorno === "development" ? "apinovades" : "apinova"
    const url = `/${baseSeleccionada}/generico/obtenerVentasHora.php?_i={"_e":"${empresa}","_m":"${homologacion}","_fi":"${from}","_ff":"${to}"}`;
console.log('url', url)
    const { data } = await apiPhp(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    console.log(error);
  }
}
export async function obtenerRubrosDisponibles() {
  // anda en los dos entornos, no funciona en homo.
  const homologacion = localStorage.getItem("homologacion") || "homo"; // o valor default
  const entorno = localStorage.getItem("_ce") || "development";        // o valor default
  try {
     const baseSeleccionada = entorno === "development" ? "apinovades" : "apinova"
    const url = `/${baseSeleccionada}/generico/obtenerSeccionesRubros.php?_i={"_e":"${empresa}","_s":"08","_m":"${homologacion}","_o":"1"}`;
    const { data } = await apiPhp(url);
    console.log('url obtenerRubrosDisponibles', url)

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
  const entorno = localStorage.getItem("_ce") || "development";  
  try {
    const baseSeleccionada = entorno === "development" ? "apinovades" : "apinova"
    const url = `/${baseSeleccionada}/generico/obtenerStock.php`;
    console.log('url stock', url)

    const datos = {
      _e: empresa,
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
  // obtener productos funciona solo con apinovades
  // pero funciona con homo y con prod
  const entorno = localStorage.getItem("_ce") || "development";  
  const homologacion = localStorage.getItem("homologacion") || "homo"; // o valor default
  try {
    const baseSeleccionada = entorno === "development" ? "apinovades" : "apinova"
    const url = `/${baseSeleccionada}/generico/obtenerProducto.php?_i={"_e":"${empresa}","_s":"08","_m":"${homologacion}"}`;
    console.log('url stock', url)

    const datos = { secciones, rubros };
    // console.log(datos);
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
