// src/components/SwitchHomologacion.tsx

import SwitchGenerico from "../../informes/_components/Switch";
import { useEntornoStore } from "../Store/useEntornoStore";

export default function SwitchHomologacion() {
  const { homologacion, setHomologacion } = useEntornoStore();

  const toggleEntorno = () => {
    const nuevo = homologacion === "prod" ? "dev" : "prod";
    setHomologacion(nuevo);
    console.log("Nuevo entorno:", nuevo);
  };

  return (
    <div>
      <SwitchGenerico label="Homologación" valueOff="Desarrollo" valueOn="Producción" onToggle={toggleEntorno} isChecked={homologacion === "prod"} />
    </div>
  );
}
