import { isAxiosError } from 'axios';
import api from '../lib/axios';

export async function obtenerDashboardCards() {
  try {
    const { data } = await api('/obtener_dashboardcards');

    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    console.log(error);
  }
}

export async function obtenerDashboardGrafico() {
  try {
    const { data } = await api('/obtener_dashboardgrafico');

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    console.log(error);
  }
}

export async function obtenerTortaCobranzasR() {
  try {
    const { data } = await api('/obtener_cobranzafon');

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    console.log(error);
  }
}

export async function obtenerCajasSecciones() {
  try {
    const { data } = await api('/obtener_cajasseccion');

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

export async function obtenerCajasImportes() {
  try {
    const { data } = await api('/obtener_cajaimportes');

    // console.log(result);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      console.log(error);
      throw new Error('Error desconocido al obtener las cajas');
    }
  }
}
