import CheckboxInput from "@/Components/ui/Inputs/Checkbox";
import { useStockPorSeccion } from "@/store/useStockPorSeccion";
import { useState } from "react";

export default function FiltrarSegunLista() {
  const [disabled, setDisabled] = useState(false);

  const { checkboxSeleccionados, setCheckboxSeleccionados } =
    useStockPorSeccion();
  const handleCheckboxChange = (
    grupo: keyof typeof checkboxSeleccionados,
    value: string
  ) => {
    const nuevoValor = checkboxSeleccionados[grupo] === value ? null : value;

    setCheckboxSeleccionados(grupo, nuevoValor);
  };

  return (
    <div className="flex gap-1 border p-1 rounded-lg bg-white">
      <CheckboxInput
        onChange={() => handleCheckboxChange("grupo3", "CONTADO")}
        checked={checkboxSeleccionados.grupo3 === "CONTADO"}
        disabled={disabled}
        setDisabled={setDisabled}
        label="CONTADO"
      />
      <CheckboxInput
        onChange={() => handleCheckboxChange("grupo3", "LISTA 2")}
        checked={checkboxSeleccionados.grupo3 === "LISTA 2"}
        disabled={disabled}
        setDisabled={setDisabled}
        label="LISTA 2"
      />{" "}
      <CheckboxInput
        onChange={() => handleCheckboxChange("grupo3", "LISTA 3")}
        checked={checkboxSeleccionados.grupo3 === "LISTA 3"}
        disabled={disabled}
        setDisabled={setDisabled}
        label="LISTA 3"
      />
    </div>
  );
}
