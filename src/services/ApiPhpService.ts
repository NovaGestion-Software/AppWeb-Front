// 🔹 Imports
import { FechasRango } from "@/types";
import apiPhp from "../lib/axiosPhp";
import { getBaseSeleccionada, getEmpresa, getHomologacion, manejarErrorAxios } from "./utils/helpers";

// 💳 MercadoPago

export async function obtenerTokenMP() {
  const homologacion = getHomologacion();
  const empresa = getEmpresa();

  const url = `/apinovades/mercadopago/obtenerMercadoToken.php?_i={"_e":"${empresa}",
  "_m":"${homologacion}","_a":"2"}`;

  try {
    const { data } = await apiPhp(url);
    return data;
  } catch (error) {
    manejarErrorAxios(error, "Error");
  }
}

export async function grabarMercadoAcceso(code: string) {
  const homologacion = getHomologacion("_m");
  //const base = getBaseSeleccionada();
  const empresa = getEmpresa();

  const url = `/apinovades/mercadopago/grabarMercadoAcceso.php`;

  const payload = {
    _e: empresa,
    _m: homologacion,
    _a: "2",
    _c: code,
  };

  try {
    const { data } = await apiPhp(url, {
      method: "POST",
      data: payload,
    });
    console.log('grabar acceso data',data)
    return data;
  } catch (error) {
    manejarErrorAxios(error, "No se pudo grabar el código de Mercado Pago");
  }
}

export async function obtenerUrlAuthorization() {
  // const homologacion = getHomologacion();
  const empresa = getEmpresa();

  const url = `/apinovades/mercadopago/obtenerMpAuth.php?_i={"_e":"${empresa}",
  "_m":"homo","_a":"2"}`;

  try {
    const { data } = await apiPhp(url);
    return data;

    // console.log(url);
    // console.log(data);
  } catch (error) {
    manejarErrorAxios(error, "Error al obtener la URL de autorización");
  }
}

export async function obtenerEstadoIntegracionMP(empresa: string) {
  const url = `/apinovades/mercadopago/consultaMercado.php?_i={"_e":"${empresa}","_m":"homo","_a":"2"}`;
  try {
    const { data } = await apiPhp(url);
    return data;
  } catch (error) {
    manejarErrorAxios(error, "Error al obtener la URL de autorización");
  }
}

// 📈 Ventas

export async function obtenerVentasHora(fechas: FechasRango) {
  const homologacion = "prod";
  const base = getBaseSeleccionada();
  const empresa = getEmpresa();
  const { from, to } = fechas;

  const url = `/${base}/generico/obtenerVentasHora.php?_i={"_e":"${empresa}","_m":"${homologacion}","_fi":"${from}","_ff":"${to}"}`;
  try {
    const { data } = await apiPhp(url);
   console.log('data11', data)
    return data;
  } catch (error) {
    manejarErrorAxios(error, "Error al obtener ventas por hora");
  }
}

export async function obtenerVentasPorSucursal(fechas: FechasRango) {
  const homologacion = getHomologacion();
  const base = getBaseSeleccionada();
  const empresa = getEmpresa();
  const { from, to } = fechas;

  const url = `/${base}/generico/obtenerVentasHora.php?_i={"_e":"${empresa}","_m":"${homologacion}","_fi":"${from}","_ff":"${to}"}`;

  try {
    const { data } = await apiPhp(url);
    return data;
  } catch (error) {
    manejarErrorAxios(error, "Error al obtener ventas por sucursal");
  }
}

// 📦 Rubros y Productos

export async function obtenerRubrosDisponibles() {
  const homologacion = getHomologacion();
  const base = getBaseSeleccionada();
  const empresa = getEmpresa();

  const url = `/${base}/generico/obtenerSeccionesRubros.php?_i={"_e":"${empresa}","_s":"08","_m":"${homologacion}","_o":"1"}`;

  console.log("url", url);
  try {
    const { data } = await apiPhp(url);
    console.log("obtenerSeccionesRubros", data);
    return data;
  } catch (error) {
    manejarErrorAxios(error, "Error al obtener secciones de rubros");
  }
}

export async function obtenerProductos(secciones: string[], rubros: string[]) {
  const homologacion = getHomologacion();
  const base = getBaseSeleccionada();
  const empresa = getEmpresa();

  const url = `/${base}/generico/obtenerProducto.php?_i={"_e":"${empresa}","_s":"08","_m":"${homologacion}"}`;

  console.log("url", url);
  try {
    const { data } = await apiPhp(url, {
      method: "POST",
      data: { secciones, rubros },
    });
    console.log("POST obtenerProducto", data);
    console.log("POST bdoy", {
      data: { secciones, rubros },
    });
    return data;
  } catch (error) {
    manejarErrorAxios(error, "Error al obtener productos");
  }
}
