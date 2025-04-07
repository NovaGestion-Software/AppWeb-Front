import { useStockPorSeccion } from "@/views/app/stockSeccion/store/useStockPorSeccion";
import RadioInput from "@/Components/ui/Inputs/RadioInput";

export default function FiltrarPorTipo() {
  const { checkboxSeleccionados, setCheckboxSeleccionados, status } =
    useStockPorSeccion();

  const handleCheckboxChange = (
    grupo: keyof typeof checkboxSeleccionados,
    value: string
  ) => {
    const nuevoValor = checkboxSeleccionados[grupo] === value ? "" : value;

    setCheckboxSeleccionados(grupo, nuevoValor);
  };

  return (
    <div className="flex gap-1 border p-1 rounded-lg bg-white">
      <RadioInput
        onChange={() => handleCheckboxChange("grupo1", "Todos")}
        checked={checkboxSeleccionados.grupo1 === "Todos"}
        disabled={status === "idle"}
        label="Todos"
      />{" "}
      <RadioInput
        onChange={() => handleCheckboxChange("grupo1", "Talles")}
        checked={checkboxSeleccionados.grupo1 === "Talles"}
        disabled={status === "idle"}
        label="Talles"
      />
      <RadioInput
        onChange={() => handleCheckboxChange("grupo1", "Articulos")}
        checked={checkboxSeleccionados.grupo1 === "Articulos"}
        disabled={status === "idle"}
        label="Artículos"
      />{" "}
    </div>
  );
}
