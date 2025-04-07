import { useStockPorSeccion } from "@/views/app/stockSeccion/store/useStockPorSeccion";
import RadioInput from "@/Components/ui/Inputs/RadioInput";

export default function OrdenarPorCheckbox() {
  const { checkboxSeleccionados, setCheckboxSeleccionados, status } = useStockPorSeccion();

  const handleCheckboxChange = (
    grupo: keyof typeof checkboxSeleccionados,
    value: string
  ) => {
    const nuevoValor = checkboxSeleccionados[grupo] === value ? null : value;
    setCheckboxSeleccionados(grupo, nuevoValor); };

  return (
    <>
      <div className="flex gap-1 border p-1 rounded-lg bg-white">
        <RadioInput
          onChange={() => handleCheckboxChange("grupo4", "Codigo")}
          checked={checkboxSeleccionados.grupo4 === "Codigo"}
          label="Código"
          disabled={status === "idle"}
        />
        <RadioInput
          onChange={() => handleCheckboxChange("grupo4", "Descripcion")}
          checked={checkboxSeleccionados.grupo4 === "Descripcion"}
          label="Descripción"
          disabled={status === "idle"}
        />
        <RadioInput
          onChange={() => handleCheckboxChange("grupo4", "Marca")}
          checked={checkboxSeleccionados.grupo4 === "Marca"}
          label="Marca"
          disabled={status === "idle"}
        />
      </div>
    </>
  );
}
