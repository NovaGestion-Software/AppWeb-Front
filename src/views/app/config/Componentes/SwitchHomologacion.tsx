// src/components/SwitchHomologacion.tsx

import SwitchGenerico from "../../informes/_components/Switch";
import { useEntornoStore } from "../Store/useEntornoStore";

export default function SwitchHomologacion() {
  const { homologacion, setHomologacion } = useEntornoStore();

  const toggleEntorno = () => {
    const nuevo = homologacion === "prod" ? "homo" : "prod";
    setHomologacion(nuevo);
    console.log("Nuevo entorno:", nuevo);
  };

  return (
      <SwitchGenerico label="Modo" valueOff="Homologacion" className="mt-5" 
      valueOn="Producción" onToggle={toggleEntorno} isChecked={homologacion === "prod"} />
  );
}
