import { useStockPorSeccion } from "@/views/app/stockSeccion/store/useStockPorSeccion";
import { useState } from "react";
import RadioInput from "@/Components/ui/Inputs/RadioInput";

export default function FiltroPorStock() {
  const [disabled, setDisabled] = useState(false);
  const { checkboxSeleccionados, setCheckboxSeleccionados } =
    useStockPorSeccion();

  const handleCheckboxChange = (
    grupo: keyof typeof checkboxSeleccionados,
    value: string
  ) => {
    const nuevoValor = checkboxSeleccionados[grupo] === value ? "" : value;

    // Llamar a setCheckboxSeleccionados con los dos argumentos
    setCheckboxSeleccionados(grupo, nuevoValor);
  };

  return (
    <div className="flex gap-1 border p-1 rounded-lg ">
      <RadioInput
        onChange={() => handleCheckboxChange("grupo2", "Todos")}
        checked={checkboxSeleccionados.grupo2 === "Todos"}
        label="Todos"
        disabled={disabled}
        setDisabled={setDisabled}
      />
      <RadioInput
        onChange={() => handleCheckboxChange("grupo2", "Con Stock")}
        checked={checkboxSeleccionados.grupo2 === "Con Stock"}
        label="Con Stock"
        disabled={disabled}
        setDisabled={setDisabled}
      />
      <RadioInput
        onChange={() => handleCheckboxChange("grupo2", "Negativos")}
        checked={checkboxSeleccionados.grupo2 === "Negativos"}
        label="Negativos"
        disabled={disabled}
        setDisabled={setDisabled}
      />
    </div>
  );
}
