import { isAxiosError } from "axios";
import { FechasRango } from "@/types";
import apiPhp from "../lib/axiosPhp";

const user = JSON.parse(localStorage.getItem("_u") || "{}");
console.log('user', user)
const empresa = user.empresa.toString().slice(-2); 
console.log('empresa', empresa)

export async function grabarCodeMercadoPago(code: string) {
  const entorno = localStorage.getItem("_ce") || "development";
  const homologacion = localStorage.getItem("homologacion") || "homo";
  console.log('usuario', user)
  console.log('empresa', empresa)

  const baseSeleccionada = entorno === "development" ? "apinovades" : "apinova";

  const url = `/${baseSeleccionada}/mercadopago/grabarMercadoAcceso.php`;

  const payload = {
    _e: empresa,
    _m: homologacion,
    _a: "1",
    _c: code,
  };

    // 🟢 Mostrar lo que se va a enviar
  console.log("📤 Enviando solicitud a:", url);
  console.log("📝 Payload:", JSON.stringify(payload, null, 2));

  try {
    const { data } = await apiPhp(url, {
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('error principal',error)
      console.error("🔴 Axios error");
      console.error("👉 Mensaje:", error.message);
      console.error("👉 Código:", error.code);
      console.error("👉 Config:", error.config);
      if (error.response) {
        console.error("👉 Status:", error.response.status);
        console.error("👉 Headers:", error.response.headers);
        console.error("👉 Data:", error.response.data);
        throw new Error(error.response.data?.error || "Error en la respuesta del servidor");
      } else if (error.request) {
        console.error("👉 Request enviada pero sin respuesta");
        console.error(error.request);
      } else {
        console.error("👉 Error desconocido:", error.message);
      }
    } else {
      console.error("🟠 Error no Axios:", error);
    }

    throw new Error("No se pudo grabar el código de Mercado Pago");
  }
}

export async function obtenerUrlAuthorization() {
  // anda en los dos entornos, no funciona en homo.
  const homologacion = localStorage.getItem("homologacion") || "homo"; // o valor default
  const entorno = localStorage.getItem("_ce") || "development"; // o valor default
  try {
    const baseSeleccionada = entorno === "development" ? "apinovades" : "apinova";
    const url = `/${baseSeleccionada}/mercadopago/obtenerMpAuth.php?_i={"_e":"${empresa}","_m":"${homologacion}","_a":"1"}`;

    const { data } = await apiPhp(url);
    console.log("url obtenerUrlAuthorization", url);
    console.log("url obtenerUrlAuthorization", data);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      console.log(error);
      throw new Error("Error desconocido al obtener  secciones de cajas");
    }
  }
}

export async function obtenerVentasHora(fechas: FechasRango) {
  // funciona con ambos entornos y con homologacion en prod
  const homologacion = localStorage.getItem("homologacion") || "homo"; // o valor default
  const entorno = localStorage.getItem("_ce") || "development"; // o valor default
  try {
    // console.log('fechas seteadas en funcion', fechas);
    console.log("empresa", empresa);
    const { from, to } = fechas;
    const baseSeleccionada = entorno === "development" ? "apinovades" : "apinova";
    const url = `/${baseSeleccionada}/generico/obtenerVentasHora.php?_i={"_e":"${empresa}","_m":"${homologacion}","_fi":"${from}","_ff":"${to}"}`;
    console.log("url", url);
    const { data } = await apiPhp(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    console.log(error);
  }
}

export async function obtenerVentasPorSucursal(fechas: FechasRango) {
  // funciona con ambos entornos y con homologacion en prod
  const homologacion = localStorage.getItem("homologacion") || "homo"; // o valor default
  const entorno = localStorage.getItem("_ce") || "development"; // o valor default
  try {
    // console.log('fechas seteadas en funcion', fechas);
    const { from, to } = fechas;
    const baseSeleccionada = entorno === "development" ? "apinovades" : "apinova";
    const url = `/${baseSeleccionada}/generico/obtenerVentasHora.php?_i={"_e":"${empresa}","_m":"${homologacion}","_fi":"${from}","_ff":"${to}"}`;
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
  const entorno = localStorage.getItem("_ce") || "development"; // o valor default
  try {
    const baseSeleccionada = entorno === "development" ? "apinovades" : "apinova";
    const url = `/${baseSeleccionada}/generico/obtenerSeccionesRubros.php?_i={"_e":"${empresa}","_s":"08","_m":"${homologacion}","_o":"1"}`;
    const { data } = await apiPhp(url);
    console.log("url obtenerRubrosDisponibles", url);

    // console.log(result);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      console.log(error);
      throw new Error("Error desconocido al obtener  secciones de cajas");
    }
  }
}

// export async function obtenerStock(rubros: string[]) {
//   const entorno = localStorage.getItem("_ce") || "development";
//   try {
//     const baseSeleccionada = entorno === "development" ? "apinovades" : "apinova"
//     const url = `/${baseSeleccionada}/generico/obtenerStock.php`;
//     console.log('url stock1', url)

//     const datos = {
//       _e: empresa,
//       _m: 'prod',
//       _r: 'JSON',
//       _j: rubros,
//     };

//     // console.log(datos);

//     const { data } = await apiPhp(url, {
//       method: 'POST',
//       data: datos,
//     });

//     return data;
//   } catch (error) {
//     if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
//     console.log(error);
//   }
// }
export async function obtenerProductos(secciones: string[], rubros: string[]) {
  // obtener productos funciona solo con apinovades
  // pero funciona con homo y con prod
  const entorno = localStorage.getItem("_ce") || "development";
  const homologacion = localStorage.getItem("homologacion") || "homo"; // o valor default
  try {
    const baseSeleccionada = entorno === "development" ? "apinovades" : "apinova";
    const url = `/${baseSeleccionada}/generico/obtenerProducto.php?_i={"_e":"${empresa}","_s":"08","_m":"${homologacion}"}`;
    console.log("url stock2", url);

    const datos = { secciones, rubros };
    // console.log(datos);
    // Enviar las secciones y rubros en el cuerpo de la solicitud
    const { data } = await apiPhp(url, {
      method: "POST",
      data: datos,
    });

    console.log("url data", data);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
    console.log(error);
  }
}
