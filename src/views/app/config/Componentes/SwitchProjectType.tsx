import SwitchGenerico from "../../informes/_components/Switch";
import { useEntornoStore } from "../Store/useEntornoStore";

export default function SwitchProjectType() {
  const { projectType, setProjectType } = useEntornoStore();

  const toggleType = () => {
    const nuevo = projectType === "prod" ? "dev" : "prod";
    setProjectType(nuevo);
  };

  return (
    <div>
      <SwitchGenerico className="mt-5" label="Proyecto" valueOff="Desarrollo" valueOn="Producción" onToggle={toggleType} isChecked={projectType === "prod"} />
    </div>
  );
}
