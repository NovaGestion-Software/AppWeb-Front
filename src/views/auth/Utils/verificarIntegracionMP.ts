import { obtenerEstadoIntegracionMP } from "@/services/ApiPhpService";

export async function verificarIntegracionMP(empresa: string) {
  try {
    const respuesta = await obtenerEstadoIntegracionMP(empresa);

    if (respuesta?.status === "success" && respuesta.data?.existe === 1) {
      localStorage.setItem("_mqr", "1");
    } else {
      localStorage.setItem("_mqr", "0");
    }
  } catch (error) {
    console.error("Error al verificar la integración MP:", error);
    localStorage.setItem("_mqr", "0"); // fallback seguro
  }
}
