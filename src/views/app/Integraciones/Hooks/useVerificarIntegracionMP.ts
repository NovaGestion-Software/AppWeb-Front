import { useEffect, useState } from "react";

export function useVerificarIntegracionMP() {
  const [estadoIntegracion, setEstadoIntegracion] = useState<null | boolean>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const mqr = localStorage.getItem("_mqr");

    if (mqr === "1") {
      setEstadoIntegracion(true);
    } else {
      setEstadoIntegracion(false);
    }

    setCargando(false); // o poné un timeout si querés simular un loader
  }, []);

  return { estadoIntegracion, cargando };
}
