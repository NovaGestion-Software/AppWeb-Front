import { useEffect, useState } from "react";

export function useUserData() {
  const [empresa, setEmpresa] = useState<string | null>(null);
  const [modo, setModo] = useState<string | null>(null);

  useEffect(() => {
    const empresaValue = localStorage.getItem("_u");
    const modoValue = localStorage.getItem("_ce");

    if (empresaValue) {
      try {
        const eParsed = JSON.parse(empresaValue);
        setEmpresa(eParsed.empresa ?? null);
      } catch (error) {
        console.error("Error al parsear _u:", error);
      }
    }

    setModo(modoValue);
  }, []);

  return { empresa, modo };
}
